
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/database.types";
import placeholder from "/placeholder.svg";

const MyTasks = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get tasks posted by the current user
  const { tasks: postedTasks, isLoading: isLoadingPostedTasks } = useTasks({
    owner_id: user?.id
  });
  
  // Get tasks assigned to the current user
  const { tasks: assignedTasks, isLoading: isLoadingAssignedTasks } = useTasks({
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

  if (isLoading || loading || isLoadingPostedTasks || isLoadingAssignedTasks) {
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <Button onClick={() => navigate("/post-task")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Post a Task
          </Button>
        </div>

        <Tabs defaultValue="posted">
          <TabsList className="mb-6">
            <TabsTrigger value="posted">Tasks I Posted</TabsTrigger>
            <TabsTrigger value="assigned">Tasks Assigned to Me</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posted">
            {postedTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postedTasks.map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    price={task.budget}
                    location={task.location || 'Remote'}
                    date={formatTaskDate(task.created_at)}
                    category={'Category'} // Would need to fetch category name
                    authorName={user?.first_name + ' ' + user?.last_name || 'User'}
                    authorImage={user?.profile_image_url || placeholder}
                    authorRating={user?.rating || 0}
                    urgent={task.is_urgent}
                    onClick={() => navigate(`/task/${task.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-gray-500 mb-4">You haven't posted any tasks yet</p>
                  <Button onClick={() => navigate("/post-task")}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Post a Task
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="assigned">
            {assignedTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedTasks.map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    price={task.budget}
                    location={task.location || 'Remote'}
                    date={formatTaskDate(task.created_at)}
                    category={'Category'} // Would need to fetch category name
                    authorName={'Task Owner'} // Would need to fetch owner details
                    authorImage={placeholder}
                    authorRating={4.5} // Would need to fetch rating
                    urgent={task.is_urgent}
                    onClick={() => navigate(`/task/${task.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-gray-500">You don't have any tasks assigned to you</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MyTasks;
