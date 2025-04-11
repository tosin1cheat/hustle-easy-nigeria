import { supabase } from './supabase';

const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

type InitiatePaymentProps = {
  email: string;
  amount: number; // Amount in Naira (will be converted to kobo)
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
};

type PaystackResponse = {
  status: boolean;
  message: string;
  data?: any;
};

/**
 * Client-side function to initiate a payment using Paystack's standard checkout
 */
export const initiatePayment = ({
  email,
  amount,
  reference = '',
  metadata = {}
}: InitiatePaymentProps): Promise<{reference: string}> => {
  return new Promise((resolve, reject) => {
    if (!PAYSTACK_PUBLIC_KEY) {
      reject(new Error('Paystack public key not found. Please check your environment variables.'));
      return;
    }
    
    // We need to load the Paystack script dynamically
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        processPayment();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Paystack script. Please check your internet connection.'));
      };
      document.body.appendChild(script);
    } else {
      processPayment();
    }
    
    function processPayment() {
      const amountInKobo = Math.floor(amount * 100);
      const paymentReference = reference || generateReference();
      
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: amountInKobo,
        ref: paymentReference,
        metadata: {
          ...metadata,
          custom_fields: [
            {
              display_name: "Platform",
              variable_name: "platform",
              value: "Hustlrs"
            }
          ]
        },
        onClose: () => {
          reject(new Error('Payment window closed'));
        },
        callback: (response: any) => {
          resolve({ reference: response.reference });
        }
      });
      
      handler.openIframe();
    }
  });
};

/**
 * Server-side function to verify a payment (to be called from Supabase Edge Function)
 */
export const verifyPayment = async (reference: string): Promise<PaystackResponse> => {
  // This should be called from a Supabase Edge Function to keep the secret key secure
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json"
    }
  });
  
  return response.json();
};

/**
 * Helper function to generate a unique reference
 */
export const generateReference = () => {
  const timestamp = new Date().getTime().toString();
  const random = Math.random().toString(36).substring(2, 15);
  return `HUSTLR-${timestamp}-${random}`;
};

/**
 * Function to fund user wallet (to be called after payment verification)
 */
export const fundWallet = async (userId: string, amount: number, reference: string) => {
  try {
    // First, insert the transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        amount,
        type: 'deposit',
        status: 'completed',
        reference,
        created_at: new Date().toISOString(),
        payment_method: 'paystack'
      })
      .select()
      .single();

    if (transactionError) {
      throw transactionError;
    }

    // Update user's wallet balance using RPC function
    const { error: walletError } = await supabase
      .rpc('update_wallet_balance', {
        user_id: userId,
        amount_to_add: amount
      });

    if (walletError) {
      throw walletError;
    }

    return { success: true, transaction };
  } catch (error) {
    console.error('Error funding wallet:', error);
    return { success: false, error };
  }
};

// Add window.PaystackPop to global scope
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}
