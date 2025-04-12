
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/database.types";
import TaskCard from "@/components/TaskCard";
import placeholder from "/placeholder.svg";

const CompletedTasks = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get completed tasks that the user either posted or was assigned to
  const { tasks: completedPosted, isLoading: isLoadingPosted } = useTasks({
    status: 'completed',
    owner_id: user?.id
  });
  
  const { tasks: completedAssigned, isLoading: isLoadingAssigned } = useTasks({
    status: 'completed',
    assigned_to: user?.id
  });

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!loading && !user) {
      navigate("/auth/sign-in");
    } else {
      setIsLoading(false);
    }
  }, [user, loading, navigate]);

  if (isLoading || loading || isLoadingPosted || isLoadingAssigned) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-hustlr-green" />
      </div>
    );
  }

  const formatTaskDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Combine tasks and sort by date (most recent first)
  const allCompletedTasks = [...completedPosted, ...completedAssigned].sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>
        
        {allCompletedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCompletedTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                price={task.budget}
                location={task.location || 'Remote'}
                date={formatTaskDate(task.completed_at || task.updated_at)}
                category={'Category'} // Would need to fetch category name
                authorName={task.owner_id === user?.id ? 'You (Owner)' : 'You (Worker)'}
                authorImage={user?.profile_image_url || placeholder}
                authorRating={user?.rating || 0}
                urgent={task.is_urgent}
                onClick={() => navigate(`/task/${task.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">You don't have any completed tasks yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedTasks;
