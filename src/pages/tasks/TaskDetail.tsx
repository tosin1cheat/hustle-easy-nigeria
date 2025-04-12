
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Clock, MapPin, Calendar, DollarSign, CheckCircle2, User } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { getTaskById } = useTasks();
  
  const { data: task, isLoading, error } = getTaskById(id || "");

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!loading && !user) {
      navigate("/auth/sign-in");
    }
  }, [user, loading, navigate]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-hustlr-green" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <p className="text-xl font-bold text-red-500">Task not found</p>
            <Button onClick={() => navigate(-1)} variant="outline" className="mt-4">
              Go Back
            </Button>
          </div>
        </div>
      </>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Determine if current user is owner or worker
  const isOwner = task.owner_id === user?.id;
  const isWorker = task.assigned_to === user?.id;
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {task.is_urgent && (
                        <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
                          Urgent
                        </Badge>
                      )}
                      <Badge className="bg-hustlr-light text-hustlr-green hover:bg-hustlr-light">
                        {task.is_remote ? "Remote" : "On-site"}
                      </Badge>
                      <Badge variant="secondary">
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
                  </div>
                  <div className="bg-hustlr-green text-white py-1 px-3 rounded-full flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    <span className="font-semibold">₦{task.budget.toLocaleString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="whitespace-pre-wrap">{task.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-gray-500" />
                    <span>Posted: {formatDate(task.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2 text-gray-500" />
                    <span>{task.location || "Remote"}</span>
                  </div>
                  {task.deadline && (
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2 text-gray-500" />
                      <span>Due: {formatDate(task.deadline)}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-gray-500" />
                    <span>{isOwner ? "You (Owner)" : "Task Owner"}</span>
                  </div>
                </div>
                
                {task.images && task.images.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Images</h3>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {task.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <img 
                                src={image} 
                                alt={`Task image ${index + 1}`} 
                                className="rounded-md object-cover w-full h-64"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {task.status === 'open' && !isOwner && (
                  <Button className="w-full">Apply for This Task</Button>
                )}
                {task.status === 'assigned' && isWorker && (
                  <Button className="w-full">Mark as Complete</Button>
                )}
                {isOwner && task.status === 'open' && (
                  <Button className="w-full" variant="outline">Edit Task</Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Task Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle2 size={18} className="mr-2 text-green-500" />
                    <span>Posted</span>
                  </div>
                  <div className={`flex items-center ${task.status !== 'open' ? 'opacity-50' : ''}`}>
                    <div className={`w-5 h-5 rounded-full border mr-2 ${task.status !== 'open' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                    <span>Open for Applications</span>
                  </div>
                  <div className={`flex items-center ${task.status !== 'assigned' && task.status !== 'in_progress' && task.status !== 'completed' ? 'opacity-50' : ''}`}>
                    <div className={`w-5 h-5 rounded-full border mr-2 ${task.status !== 'open' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                    <span>Assigned</span>
                  </div>
                  <div className={`flex items-center ${task.status !== 'completed' ? 'opacity-50' : ''}`}>
                    <div className={`w-5 h-5 rounded-full border mr-2 ${task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                    <span>Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
