
import { useState } from "react";

// Mock implementation of uploadthing functionality
export interface UploadThingResponse {
  url: string;
}

export function useUploadThing(endpoint: string, callbacks?: {
  onClientUploadComplete?: (res?: UploadThingResponse[]) => void;
  onUploadError?: (error: Error) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  // Mock file upload function
  const startUpload = async (files: File[]) => {
    if (!files.length) return [];
    
    try {
      setIsUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock URLs for the uploaded files
      const mockUrls = files.map((file, index) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }));
      
      if (callbacks?.onClientUploadComplete) {
        callbacks.onClientUploadComplete(mockUrls as unknown as UploadThingResponse[]);
      }
      
      return mockUrls;
    } catch (error) {
      if (callbacks?.onUploadError) {
        callbacks.onUploadError(error as Error);
      }
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  // Mock permitted file info
  const permittedFileInfo = {
    config: {
      maxFileSize: "4MB",
      maxFileCount: 4
    },
    accept: ["image/jpeg", "image/png", "image/webp", "image/gif"]
  };

  return {
    startUpload,
    isUploading,
    permittedFileInfo
  };
}
