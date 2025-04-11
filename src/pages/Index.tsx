
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import TasksSection from "@/components/TasksSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Wallet, 
  BadgeCheck, 
  TrendingUp, 
  ArrowRight,
  Star,
  MessageSquare,
  Clock
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <TasksSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose Hustlrs</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              We're making it easier than ever to get tasks done or earn money on your own schedule
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-hustlr-green" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Payments are held safely until the task is completed to your satisfaction
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="text-hustlr-green" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Users</h3>
              <p className="text-gray-600">
                All users undergo KYC verification for a trusted community
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wallet className="text-hustlr-green" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Wallet Integration</h3>
              <p className="text-gray-600">
                Easily manage your earnings and payments in one place
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-hustlr-green" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rewards System</h3>
              <p className="text-gray-600">
                Earn points and rewards with our gamified experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-hustlr-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Join thousands of satisfied users who love using Hustlrs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-hustlr-yellow">
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I've been able to make extra income during weekends by completing small tasks. The platform is easy to use and payments are always prompt."
              </p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">Oluwaseun A.</p>
                  <p className="text-sm text-gray-500">Tasker from Lagos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-hustlr-yellow">
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "As a busy entrepreneur, Hustlrs has been a lifesaver. I can quickly find reliable people to help with various tasks and focus on growing my business."
              </p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">Funke O.</p>
                  <p className="text-sm text-gray-500">Client from Abuja</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-hustlr-yellow">
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                  <Star className="fill-hustlr-yellow" size={16} />
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I love that I can find remote work on Hustlrs. As a student, it gives me flexibility to earn while still focusing on my studies."
              </p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/women/67.jpg" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">Blessing E.</p>
                  <p className="text-sm text-gray-500">Tasker from Port Harcourt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Get things done in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative">
                <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-hustlr-green" size={28} />
                </div>
                <div className="absolute top-8 left-full w-full h-0.5 bg-hustlr-green hidden md:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Post a Task</h3>
              <p className="text-gray-600">
                Describe what you need done, set your budget, and post it to our marketplace
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="text-hustlr-green" size={28} />
                </div>
                <div className="absolute top-8 left-full w-full h-0.5 bg-hustlr-green hidden md:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Choose a Tasker</h3>
              <p className="text-gray-600">
                Review offers from skilled taskers and select the best match for your task
              </p>
            </div>
            
            <div className="text-center">
              <div>
                <div className="bg-hustlr-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-hustlr-green" size={28} />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Get It Done</h3>
              <p className="text-gray-600">
                Your tasker completes the job and you release payment only when satisfied
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-hustlr-green hover:bg-hustlr-darkgreen text-white">
              Learn More <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hustlr-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start hustling?</h2>
          <p className="text-xl mb-8 max-w-lg mx-auto">
            Join thousands of Nigerians earning and getting tasks done on Hustlrs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-hustlr-green hover:bg-gray-100">
              Post a Task
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-hustlr-green">
              Browse Tasks
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
