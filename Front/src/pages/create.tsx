import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import type { Picture, Salon } from "../types/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { toast } from "react-toastify";
import UnauthorizedAccess from "./UnauthorizedAccess";
import { Loader2 } from "lucide-react";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const CreateSalon = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const form = useForm<Partial<Salon>>({
    defaultValues: {
      name: "",
      description: "",
      phoneNumber: "",
      address: "",
      city: "",
      pictures: [],
    },
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!response.ok) throw new Error("Image upload failed");
    return (await response.json()).secure_url;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const uploadedPictures: Picture[] = [];
    setUploadProgress(0);

    try {
      for (const [index, file] of files.entries()) {
        const url = await uploadToCloudinary(file);
        uploadedPictures.push({
          url,
          id: "",
          salonId: "",
          createdAt: "",
          updatedAt: "",
        });
        setUploadProgress(((index + 1) / files.length) * 100);
      }

      form.setValue("pictures", [
        ...form.getValues().pictures!,
        ...uploadedPictures,
      ]);
      setPreviewImages((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    } catch (error) {
      form.setError("root", {
        message: "Failed to upload images. Please try again.",
      });
      console.error(error);
    }
  };

  const onSubmit = async (data: Partial<Salon>) => {
    try {
      console.log({
        ...data,
        pictures: data.pictures?.map((p) => ({ url: p.url })),
        ownerId: user?.id,
      });
      toast.success("Salon created successfully!");
      navigate("/dashboard");
    } catch (error) {
      form.setError("root", {
        message: "Failed to create salon. Please check your inputs.",
      });
      console.error(error);
    }
  };

  if (!isLoading && !isAuthenticated) {
    return <UnauthorizedAccess />;
  }

  if (isLoading) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin" size={64} />
        <span>Moving at speed of light. Hold tight!</span>
      </main>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-8xl mx-auto flex gap-24 items-center justify-center">
        {/* Left Side - Title and Description */}
        <div className="w-full max-w-md space-y-4 sticky top-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Create Your Salon
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Set up your professional beauty space with all necessary details to
            attract clients.
          </p>
        </div>

        {/* Right Side - Form Card */}
        <Card className="w-full max-w-2xl p-8 bg-white shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salon Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Describe your salon's specialties and services..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel>Gallery</FormLabel>
                  <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
                    <label className="cursor-pointer flex flex-col items-center justify-center p-6 space-y-4">
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="text-blue-600">
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="font-medium text-gray-900">
                          Upload Salon Photos
                        </p>
                        <p className="text-sm text-gray-500">
                          JPEG/PNG, 3-10 photos, up to 10MB each
                        </p>
                        {uploadProgress > 0 && (
                          <Progress
                            value={uploadProgress}
                            className="h-2 mt-4 bg-gray-200"
                          />
                        )}
                      </div>
                    </label>
                  </Card>

                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {previewImages.map((src, index) => (
                        <div
                          key={index}
                          className="relative aspect-square overflow-hidden rounded-lg border"
                        >
                          <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </FormItem>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Salon"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateSalon;
