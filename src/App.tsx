
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Verification from "./pages/auth/Verification";
import PostTask from "./pages/tasks/PostTask";
import MyTasks from "./pages/tasks/MyTasks";
import TaskDetail from "./pages/tasks/TaskDetail";
import CompletedTasks from "./pages/tasks/CompletedTasks";
import ProfilePage from "./pages/user/Profile";
import Wallet from "./pages/user/Wallet";
import Dashboard from "./pages/Dashboard";
import { isSupabaseConfigured } from "./lib/supabase";
import { toast } from "sonner";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  // Show nothing while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hustlr-green"></div>
    </div>;
  }
  
  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  
  return children;
};

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
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/post-task" element={
                <ProtectedRoute>
                  <PostTask />
                </ProtectedRoute>
              } />
              <Route path="/my-tasks" element={
                <ProtectedRoute>
                  <MyTasks />
                </ProtectedRoute>
              } />
              <Route path="/task/:id" element={
                <ProtectedRoute>
                  <TaskDetail />
                </ProtectedRoute>
              } />
              <Route path="/completed-tasks" element={
                <ProtectedRoute>
                  <CompletedTasks />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/wallet" element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
