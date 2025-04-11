
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Verification from "./pages/auth/Verification";
import PostTask from "./pages/tasks/PostTask";
import ProfilePage from "./pages/user/Profile";
import Dashboard from "./pages/Dashboard";
import { isSupabaseConfigured } from "./lib/supabase";
import { toast } from "sonner";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Check if Supabase is configured and show a toast notification if not
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      toast.error(
        "Supabase environment variables are missing. Please set them in your .env file.", 
        {
          description: "Check the console for more details.",
          duration: 10000,
        }
      );
      console.error(
        "Supabase is not configured correctly. You need to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables."
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/verification" element={<Verification />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post-task" element={<PostTask />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Additional routes will be added here as new pages are created */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
