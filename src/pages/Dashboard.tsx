
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!loading && !user) {
      navigate("/auth/sign-in");
    } else {
      setIsLoading(false);
    }
  }, [user, loading, navigate]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-hustlr-green" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Manage tasks you've posted</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{user?.total_tasks_posted || 0}</p>
              <p className="text-sm text-gray-500">Tasks posted</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/my-tasks")}>View Tasks</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Wallet</CardTitle>
              <CardDescription>Manage your funds</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₦{user?.wallet_balance?.toLocaleString() || 0}</p>
              <p className="text-sm text-gray-500">Available balance</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/wallet")}>Manage Wallet</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks Completed</CardTitle>
              <CardDescription>View your completed tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{user?.total_tasks_completed || 0}</p>
              <p className="text-sm text-gray-500">Completed tasks</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/completed-tasks")}>View History</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
