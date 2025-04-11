
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Loader2, Upload, User, CreditCard, Star, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';

const profileSchema = z.object({
  first_name: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  last_name: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  phone_number: z.string().min(11, { message: 'Phone number must be at least 11 characters' }),
  bio: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const depositSchema = z.object({
  amount: z.coerce
    .number()
    .min(500, { message: 'Minimum amount is ₦500' })
    .max(1000000, { message: 'Maximum amount is ₦1,000,000' }),
});

type DepositFormValues = z.infer<typeof depositSchema>;

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { walletBalance, depositFunds, isDepositing } = useWallet();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone_number: user?.phone_number || '',
      bio: user?.bio || '',
      location: user?.location || '',
    },
  });

  const depositForm = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 1000,
    },
  });

  const handleProfileUpdate = async (data: ProfileFormValues) => {
    if (!user) return;

    try {
      setIsUpdating(true);
      
      let profileImageUrl = user.profile_image_url;
      
      // Upload profile image if one was selected
      if (profileImage) {
        // This would normally upload to Supabase storage and return a URL
        // const { data: uploadData, error } = await supabase.storage
        //   .from('profile_images')
        //   .upload(`${user.id}-${Date.now()}`, profileImage);
        
        // if (error) throw error;
        // profileImageUrl = URL to uploaded image
      }
      
      await updateProfile({
        ...data,
        profile_image_url: profileImageUrl,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeposit = async (data: DepositFormValues) => {
    if (!user) return;
    
    try {
      await depositFunds(data.amount);
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Button 
            onClick={() => window.location.href = '/auth/sign-in'}
            className="bg-hustlr-green hover:bg-hustlr-darkgreen"
          >
            Sign In
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="h-16 w-16 mr-4 border-2 border-hustlr-green">
                <AvatarImage 
                  src={profileImage ? URL.createObjectURL(profileImage) : user.profile_image_url} 
                  alt={user.first_name} 
                />
                <AvatarFallback>{user.first_name?.[0]}{user.last_name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.first_name} {user.last_name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-right">
                <p className="text-sm text-gray-600">Wallet Balance</p>
                <p className="text-2xl font-bold">₦{walletBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2" size={20} />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="08012345678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Lagos, Nigeria" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself"
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Share a bit about yourself, your skills, and experience
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Profile Image</FormLabel>
                        <div className="mt-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="cursor-pointer"
                          />
                        </div>
                        {profileImage && (
                          <div className="mt-3">
                            <img
                              src={URL.createObjectURL(profileImage)}
                              alt="Profile Preview"
                              className="h-20 w-20 object-cover rounded-full"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-hustlr-green hover:bg-hustlr-darkgreen"
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Update Profile'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2" size={20} />
                    Ratings & Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <p className="text-3xl font-bold">{user.rating || 0}</p>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.round(user.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p>Based on reviews from completed tasks</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold">{user.total_tasks_completed || 0}</p>
                      <p className="text-gray-600">Tasks Completed</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{user.total_tasks_posted || 0}</p>
                      <p className="text-gray-600">Tasks Posted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2" size={20} />
                      Fund Your Wallet
                    </CardTitle>
                    <CardDescription>
                      Add money to your wallet using Paystack
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...depositForm}>
                      <form onSubmit={depositForm.handleSubmit(handleDeposit)} className="space-y-4">
                        <FormField
                          control={depositForm.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount (₦)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                Enter an amount between ₦500 and ₦1,000,000
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button 
                            type="submit" 
                            className="bg-hustlr-green hover:bg-hustlr-darkgreen"
                            disabled={isDepositing}
                          >
                            {isDepositing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              'Fund Wallet'
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Available Balance</p>
                        <p className="text-2xl font-bold">₦{walletBalance.toLocaleString()}</p>
                      </div>
                      <Separator />
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => window.location.href = '/transactions'}
                      >
                        View Transactions
                      </Button>
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => window.location.href = '/withdraw'}
                      >
                        Withdraw Funds
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2" size={20} />
                    My Tasks
                  </CardTitle>
                  <CardDescription>
                    Manage tasks you've created and tasks you're working on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="posted">
                    <TabsList className="mb-4">
                      <TabsTrigger value="posted">Tasks I've Posted</TabsTrigger>
                      <TabsTrigger value="working">Tasks I'm Working On</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="posted">
                      <div className="py-4 text-center">
                        <p className="text-gray-600">Tasks you've posted will appear here</p>
                        <Button 
                          onClick={() => window.location.href = '/post-task'}
                          className="mt-4 bg-hustlr-green hover:bg-hustlr-darkgreen"
                        >
                          Post a New Task
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="working">
                      <div className="py-4 text-center">
                        <p className="text-gray-600">Tasks you're working on will appear here</p>
                        <Button 
                          onClick={() => window.location.href = '/browse-tasks'}
                          className="mt-4 bg-hustlr-green hover:bg-hustlr-darkgreen"
                        >
                          Browse Available Tasks
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
