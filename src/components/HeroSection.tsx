
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-hustlr-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Tasks Done, <span className="hustlr-gradient-text">Earn On Your Terms</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Nigeria's flexible task marketplace connecting people who need help with skilled taskers ready to hustle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-hustlr-green hover:bg-hustlr-darkgreen text-white">
                Post a Task
              </Button>
              <Button size="lg" variant="outline" className="border-hustlr-green text-hustlr-green">
                Browse Tasks <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="mt-10 flex items-center space-x-8">
              <div>
                <p className="text-3xl font-bold text-hustlr-green">10K+</p>
                <p className="text-sm text-gray-600">Taskers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-hustlr-yellow">50K+</p>
                <p className="text-sm text-gray-600">Tasks Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-hustlr-orange">4.8/5</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Person working" 
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-hustlr-yellow opacity-20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-hustlr-green opacity-20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
