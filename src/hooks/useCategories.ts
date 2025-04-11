
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/database.types';
import { useToast } from './use-toast';

export function useCategories() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return data as Category[];
  };

  const createCategory = async (category: Omit<Category, 'id' | 'task_count'>): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        ...category,
        task_count: 0
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as Category;
  };

  const updateCategory = async ({ id, ...updates }: Partial<Category> & { id: string }): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data as Category;
  };

  const deleteCategory = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  };

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Category created',
        description: 'The category has been created successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating category',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Category updated',
        description: 'The category has been updated successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating category',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Category deleted',
        description: 'The category has been deleted successfully'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting category',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    categories,
    isLoading,
    error,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending
  };
}
