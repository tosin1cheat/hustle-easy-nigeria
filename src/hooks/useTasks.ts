
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/database.types';
import { useToast } from './use-toast';
import { useAuth } from '@/context/AuthContext';

type TaskFilters = {
  category_id?: string;
  status?: Task['status'];
  is_remote?: boolean;
  is_urgent?: boolean;
  search?: string;
  owner_id?: string;
  assigned_to?: string;
};

export function useTasks(filters: TaskFilters = {}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTasks = async (): Promise<Task[]> => {
    let query = supabase.from('tasks').select('*');

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.is_remote !== undefined) {
      query = query.eq('is_remote', filters.is_remote);
    }

    if (filters.is_urgent !== undefined) {
      query = query.eq('is_urgent', filters.is_urgent);
    }

    if (filters.owner_id) {
      query = query.eq('owner_id', filters.owner_id);
    }

    if (filters.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to);
    }

    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Task[];
  };

  const fetchTaskById = async (id: string): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Task;
  };

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Task> => {
    if (!user) {
      throw new Error('You must be logged in to create a task');
    }
    
    const newTask = {
      ...task,
      owner_id: user.id,
      status: 'open' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert(newTask)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    // Update category task count
    await supabase.rpc('increment_category_task_count', { category_id: task.category_id });

    return data as Task;
  };

  const updateTask = async ({ id, ...updates }: Partial<Task> & { id: string }): Promise<Task> => {
    const updatedTask = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as Task;
  };

  const deleteTask = async (id: string): Promise<void> => {
    const { data: task, error: fetchError } = await supabase
      .from('tasks')
      .select('category_id')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      throw fetchError;
    }
      
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
    
    // Decrement category task count
    if (task) {
      await supabase.rpc('decrement_category_task_count', { category_id: task.category_id });
    }
  };

  const assignTask = async ({ taskId, userId }: { taskId: string; userId: string }): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        assigned_to: userId,
        status: 'assigned',
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as Task;
  };

  const completeTask = async (taskId: string): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as Task;
  };

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: fetchTasks,
  });

  const getTaskById = (id: string) => {
    return useQuery({
      queryKey: ['task', id],
      queryFn: () => fetchTaskById(id),
    });
  };

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Task created',
        description: 'Your task has been created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
      toast({
        title: 'Task updated',
        description: 'The task has been updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Task deleted',
        description: 'The task has been deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const assignMutation = useMutation({
    mutationFn: assignTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
      toast({
        title: 'Task assigned',
        description: 'The task has been assigned successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error assigning task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
      toast({
        title: 'Task completed',
        description: 'The task has been marked as completed',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error completing task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    getTaskById,
    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,
    assignTask: assignMutation.mutate,
    completeTask: completeMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isAssigning: assignMutation.isPending,
    isCompleting: completeMutation.isPending,
  };
}
