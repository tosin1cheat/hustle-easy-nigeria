
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Transaction } from '@/types/database.types';
import { useToast } from './use-toast';
import { initiatePayment, fundWallet } from '@/lib/paystack';

export function useWallet() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchTransactions = async (): Promise<Transaction[]> => {
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Transaction[];
  };

  const fetchWalletBalance = async (): Promise<number> => {
    if (!user) {
      return 0;
    }

    return user.wallet_balance;
  };

  const handleDeposit = async (amount: number) => {
    if (!user) {
      throw new Error('You must be logged in to deposit funds');
    }

    try {
      // Initiate Paystack payment
      const { reference } = await initiatePayment({
        email: user.email,
        amount,
        metadata: {
          user_id: user.id
        }
      });

      // We'll call a Supabase edge function to verify and process the payment
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference, userId: user.id, amount }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state immediately
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['wallet'] });
        
        toast({
          title: 'Deposit successful',
          description: `₦${amount.toLocaleString()} has been added to your wallet`,
        });
        
        return result;
      } else {
        throw new Error(result.message || 'Failed to process payment');
      }
    } catch (error: any) {
      console.error('Deposit error:', error);
      toast({
        title: 'Deposit failed',
        description: error.message || 'Failed to process payment',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Function to withdraw funds from wallet (simplified for now)
  const handleWithdrawal = async (amount: number, bankDetails: any) => {
    if (!user) {
      throw new Error('You must be logged in to withdraw funds');
    }

    if (user.wallet_balance < amount) {
      throw new Error('Insufficient funds in your wallet');
    }

    try {
      // This would typically call a server endpoint to process the withdrawal
      // For now, we'll just update the local state
      
      // Create a withdrawal transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: -amount, // negative amount for withdrawal
          type: 'withdrawal',
          status: 'pending', // Set to pending until processed
          reference: `WITHDRAWAL-${Date.now()}`,
          created_at: new Date().toISOString(),
          payment_method: 'wallet',
        });

      if (transactionError) {
        throw transactionError;
      }

      // Update user's wallet balance
      const { error: walletError } = await supabase
        .rpc('update_wallet_balance', {
          user_id: user.id,
          amount_to_add: -amount // negative to subtract
        });

      if (walletError) {
        throw walletError;
      }

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      
      toast({
        title: 'Withdrawal initiated',
        description: `Your withdrawal of ₦${amount.toLocaleString()} is being processed`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Withdrawal failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const { data: transactions = [], isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    enabled: !!user,
  });

  const { data: walletBalance = 0, isLoading: isLoadingWallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: fetchWalletBalance,
    enabled: !!user,
  });

  const depositMutation = useMutation({
    mutationFn: handleDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: ({ amount, bankDetails }: { amount: number; bankDetails: any }) => 
      handleWithdrawal(amount, bankDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });

  return {
    transactions,
    walletBalance,
    isLoading: isLoadingTransactions || isLoadingWallet,
    depositFunds: depositMutation.mutate,
    withdrawFunds: withdrawMutation.mutate,
    isDepositing: depositMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
  };
}
