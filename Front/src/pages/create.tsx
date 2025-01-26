import { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { api } from "../api/axios";

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

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

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
      });
      await api.post("/api/salons", {
        ...data,
        pictures: data.pictures?.map((p) => ({ url: p.url })),
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button disabled variant="ghost">
          <span className="animate-pulse">Loading...</span>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/10 w-full"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8 items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="col-span-3 space-y-2 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Create Your Salon
          </h1>
          <p className="text-lg text-muted-foreground">
            Craft your unique beauty space
          </p>
        </motion.div>

        <Card className="p-8 shadow-lg rounded-xl border-none bg-background/95 backdrop-blur col-span-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {form.formState.errors.root && (
                <Alert variant="destructive" className="animate-in fade-in">
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid gap-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Salon Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 rounded-xl" />
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
                        <FormLabel className="text-base">
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="h-12 rounded-xl"
                          />
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
                      <FormLabel className="text-base">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          className="rounded-xl text-base"
                          placeholder="Tell us about your salon's unique offerings..."
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
                        <FormLabel className="text-base">Address</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 rounded-xl" />
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
                        <FormLabel className="text-base">City</FormLabel>
                        <FormControl>
                          <Input {...field} className="h-12 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel className="text-base">Gallery</FormLabel>
                  <Card className="border-2 border-dashed hover:border-primary/50 transition-colors bg-muted/20">
                    <label className="cursor-pointer flex flex-col items-center justify-center p-8 space-y-4">
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="text-primary">
                        <svg
                          className="w-16 h-16 mx-auto"
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
                        <p className="text-base font-medium">
                          Drag & drop photos
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Minimum 3 images • Max 10MB each
                        </p>
                        {uploadProgress > 0 && (
                          <Progress
                            value={uploadProgress}
                            className="h-2 mt-4 bg-muted"
                          />
                        )}
                      </div>
                    </label>
                  </Card>

                  {previewImages.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
                    >
                      {previewImages.map((src, index) => (
                        <Card
                          key={index}
                          className="group relative aspect-square overflow-hidden rounded-lg"
                        >
                          <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </Card>
                      ))}
                    </motion.div>
                  )}
                </FormItem>
              </div>

              <motion.div
                className="flex justify-end gap-4 mt-10"
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="h-11 px-8 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-11 px-8 rounded-xl gap-2"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <span className="animate-spin">🌀</span>
                      Creating...
                    </>
                  ) : (
                    "Launch Your Salon"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </Card>
      </div>
    </motion.div>
  );
};

export default CreateSalon;
