
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskCard from "./TaskCard";

const TasksSection = () => {
  const featuredTasks = [
    {
      id: 1,
      title: "Fill out a market research survey about mobile payment habits",
      price: 5000,
      location: "Remote",
      date: "Today",
      category: "Survey",
      authorName: "Chioma A.",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      authorRating: 4.7,
      urgent: true
    },
    {
      id: 2,
      title: "Deliver food package from Ikoyi to Victoria Island",
      price: 3000,
      location: "Lagos",
      date: "Tomorrow",
      category: "Delivery",
      authorName: "Emmanuel O.",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      authorRating: 4.9
    },
    {
      id: 3,
      title: "Set up WordPress website for local restaurant",
      price: 25000,
      location: "Remote",
      date: "This Week",
      category: "Web Development",
      authorName: "Ngozi I.",
      authorImage: "https://randomuser.me/api/portraits/women/68.jpg",
      authorRating: 4.8
    },
    {
      id: 4,
      title: "Professional portrait photography session for LinkedIn",
      price: 15000,
      location: "Abuja",
      date: "Next Week",
      category: "Photography",
      authorName: "Tunde M.",
      authorImage: "https://randomuser.me/api/portraits/men/85.jpg",
      authorRating: 4.5
    },
    {
      id: 5,
      title: "Data entry for small business inventory (2 days)",
      price: 12000,
      location: "Remote",
      date: "2 days",
      category: "Data Entry",
      authorName: "Amina B.",
      authorImage: "https://randomuser.me/api/portraits/women/23.jpg",
      authorRating: 4.6,
      urgent: true
    },
    {
      id: 6,
      title: "Pick up package from courier office and deliver to Lekki",
      price: 2500,
      location: "Lagos",
      date: "Tomorrow",
      category: "Errands",
      authorName: "David E.",
      authorImage: "https://randomuser.me/api/portraits/men/36.jpg",
      authorRating: 4.3
    }
  ];

  return (
    <section className="py-16 bg-hustlr-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Find Your Next Task</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Browse thousands of tasks or post your own to find help - all secure within our platform
          </p>
        </div>
        
        <Tabs defaultValue="featured" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
              <TabsTrigger value="remote">Remote</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="featured">
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  price={task.price}
                  location={task.location}
                  date={task.date}
                  category={task.category}
                  authorName={task.authorName}
                  authorImage={task.authorImage}
                  authorRating={task.authorRating}
                  urgent={task.urgent}
                />
              ))}
            </div>
            
            <div className="md:hidden">
              <ScrollArea className="w-full whitespace-nowrap pb-6">
                <div className="flex space-x-4 px-1">
                  {featuredTasks.map((task) => (
                    <div key={task.id} className="min-w-[290px] max-w-[290px]">
                      <TaskCard
                        title={task.title}
                        price={task.price}
                        location={task.location}
                        date={task.date}
                        category={task.category}
                        authorName={task.authorName}
                        authorImage={task.authorImage}
                        authorRating={task.authorRating}
                        urgent={task.urgent}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="newest">
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">Coming soon! Browse newest tasks.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="urgent">
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">Coming soon! Browse urgent tasks.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="remote">
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">Coming soon! Browse remote tasks.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="border-hustlr-green text-hustlr-green">
            View All Tasks
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TasksSection;
