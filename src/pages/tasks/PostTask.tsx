
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/context/AuthContext";
import { FileImage, ImageIcon, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/utils/uploadthing";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { FileRejection } from "react-dropzone";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  budget: z.coerce.number().min(1, {
    message: "Budget must be at least ₦1.",
  }),
  category_id: z.string().min(1, {
    message: "Please select a category.",
  }),
  location: z.string().optional(),
  is_remote: z.boolean().default(false),
  is_urgent: z.boolean().default(false),
  pricing_type: z.enum(['fixed', 'bidding']).default('fixed'),
});

const PostTask = () => {
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [pricingType, setPricingType] = useState<'fixed' | 'bidding'>('fixed');
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      // Do something with the response
      console.log("Files: ", res);
      if (res) {
        setUploadedImages(res.map((file) => file.url));
        toast({
          title: "Upload complete",
          description: "Your images have been uploaded successfully",
        });
      }
    },
    onUploadError: (error: Error) => {
      // Do something with the error.
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 0,
      category_id: "",
      location: "",
      is_remote: false,
      is_urgent: false,
      pricing_type: 'fixed',
    },
  });

  // Update form when pricing type changes
  useEffect(() => {
    form.setValue('pricing_type', pricingType);
  }, [pricingType, form]);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to post a task",
        variant: "destructive"
      });
      navigate("/auth/sign-in");
    }
  }, [user, navigate, toast]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      if (!user) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to post a task",
          variant: "destructive"
        });
        navigate("/auth/sign-in");
        return;
      }

      // Make sure to pass all required fields from the form
      await createTask({
        title: data.title,
        description: data.description,
        budget: data.budget,
        category_id: data.category_id,
        owner_id: user.id,
        location: data.location,
        is_remote: data.is_remote,
        is_urgent: data.is_urgent,
        images: uploadedImages,
        pricing_type: data.pricing_type
      });

      reset();
      navigate("/my-tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    form.reset();
    setUploadedImages([]);
    setPricingType('fixed');
  };

  const handleFileDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      toast({
        title: "File upload error",
        description: fileRejections[0].errors[0].message,
        variant: "destructive",
      });
      return;
    }

    startUpload(acceptedFiles);
  };
  
  // Preview image before uploading
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      handleFileDrop(files, []);
    }
  };

  // Remove an uploaded image
  const removeImage = (indexToRemove: number) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Post a Task</CardTitle>
          <CardDescription>
            Fill out the form below to post a new task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed task description"
                        className="resize-none min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Pricing Type Toggle */}
              <div className="space-y-2">
                <Label htmlFor="pricing-type">Pricing Type</Label>
                <ToggleGroup 
                  type="single" 
                  value={pricingType} 
                  onValueChange={(value) => {
                    if (value) setPricingType(value as 'fixed' | 'bidding');
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="fixed" aria-label="Fixed Price">
                    Fixed Price
                  </ToggleGroupItem>
                  <ToggleGroupItem value="bidding" aria-label="Allow Bidding">
                    Allow Bidding
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="text-sm text-muted-foreground">
                  {pricingType === 'fixed' 
                    ? "Set a fixed price for your task" 
                    : "Let freelancers bid on your task"}
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {pricingType === 'fixed' ? 'Budget' : 'Starting Budget'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={pricingType === 'fixed' ? "Enter your budget" : "Enter starting budget"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="is_remote"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Remote Task</FormLabel>
                          <CardDescription>
                            Indicate if the task can be done remotely.
                          </CardDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_urgent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Urgent Task</FormLabel>
                          <CardDescription>
                            Mark if the task is urgent.
                          </CardDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload Images (Optional)</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-hustlr-green transition-colors">
                    <FileImage className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag and drop or click to select files</p>
                    <p className="text-xs text-gray-400 mb-4">JPG, PNG, WEBP, GIF up to 4MB</p>
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept={permittedFileInfo?.accept?.join(",")}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      disabled={isUploading}
                      asChild
                    >
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        {isUploading ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="mr-2 h-4 w-4" />
                            <span>Select Images</span>
                          </>
                        )}
                      </Label>
                    </Button>
                  </div>
                  
                  {isUploading && (
                    <Progress value={65} className="w-full" />
                  )}
                  
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Uploaded ${index + 1}`}
                            className="h-20 w-full rounded-md object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeImage(index)}
                              className="w-8 h-8 p-0"
                            >
                              X
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Post Task"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostTask;
