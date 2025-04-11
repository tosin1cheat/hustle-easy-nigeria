
export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  profile_image_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  wallet_balance: number;
  rating: number;
  total_tasks_completed: number;
  total_tasks_posted: number;
  is_verified: boolean;
  location?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  slug: string;
  task_count: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  budget: number;
  category_id: string;
  owner_id: string;
  location?: string;
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  deadline?: string;
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  is_remote: boolean;
  is_urgent: boolean;
  images?: string[];
};

export type Bid = {
  id: string;
  task_id: string;
  user_id: string;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
};

export type Review = {
  id: string;
  task_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'task_payment' | 'task_earning';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  created_at: string;
  task_id?: string;
  payment_method: 'paystack' | 'wallet';
};
