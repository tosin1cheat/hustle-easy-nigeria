
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryCard from "./CategoryCard";
import { 
  ShoppingBag, 
  FileText, 
  Home, 
  Code, 
  Truck, 
  PenTool, 
  Camera, 
  Database 
} from "lucide-react";

const CategorySection = () => {
  const categories = [
    { 
      icon: <ShoppingBag size={24} />, 
      title: "Errands & Delivery", 
      count: 125 
    },
    { 
      icon: <FileText size={24} />, 
      title: "Survey & Research", 
      count: 98 
    },
    { 
      icon: <Home size={24} />, 
      title: "Home Services", 
      count: 176 
    },
    { 
      icon: <Code size={24} />, 
      title: "Tech & Development", 
      count: 243 
    },
    { 
      icon: <Truck size={24} />, 
      title: "Logistics", 
      count: 87 
    },
    { 
      icon: <PenTool size={24} />, 
      title: "Design & Creative", 
      count: 154 
    },
    { 
      icon: <Camera size={24} />, 
      title: "Photography", 
      count: 65 
    },
    { 
      icon: <Database size={24} />, 
      title: "Data Entry", 
      count: 112 
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Browse By Category</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Find the perfect task that matches your skills or get help in any category
          </p>
        </div>
        
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
            />
          ))}
        </div>

        <div className="md:hidden">
          <ScrollArea className="w-full whitespace-nowrap pb-6">
            <div className="flex space-x-4 px-1">
              {categories.map((category, index) => (
                <div key={index} className="min-w-[180px]">
                  <CategoryCard
                    icon={category.icon}
                    title={category.title}
                    count={category.count}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
