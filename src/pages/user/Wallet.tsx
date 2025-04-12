
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, ArrowDown, ArrowUp } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const Wallet = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { transactions } = useWallet();

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
        <h1 className="text-2xl font-bold mb-6">My Wallet</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Your available funds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">₦{user?.wallet_balance?.toLocaleString() || 0}</div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Funds
                </Button>
                <Button variant="outline" className="w-full">
                  <ArrowUp className="mr-2 h-4 w-4" /> Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions?.length > 0 ? (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        {transaction.type === 'deposit' && <ArrowDown className="text-green-500 mr-3" />}
                        {transaction.type === 'withdrawal' && <ArrowUp className="text-red-500 mr-3" />}
                        {transaction.type === 'task_payment' && <ArrowUp className="text-orange-500 mr-3" />}
                        {transaction.type === 'task_earning' && <ArrowDown className="text-blue-500 mr-3" />}
                        
                        <div>
                          <div className="font-medium">
                            {transaction.type === 'deposit' && 'Deposit'}
                            {transaction.type === 'withdrawal' && 'Withdrawal'}
                            {transaction.type === 'task_payment' && 'Task Payment'}
                            {transaction.type === 'task_earning' && 'Task Earning'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className={`font-semibold ${
                        transaction.type === 'deposit' || transaction.type === 'task_earning' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' || transaction.type === 'task_earning' ? '+' : '-'}
                        ₦{transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Wallet;
