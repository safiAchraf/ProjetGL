import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
import useAuth from "../../hooks/useAuth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { toast } from "react-toastify";
import { ArrowLeft, Trash2, Upload } from "lucide-react";
import type { UpdateUserPayload } from "../../types/data";

const Settings = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user, updateUser, deleteUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        currentPassword: "",
        newPassword: "",
      });
      setAvatarUrl(user.avatar || "");
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: false,
    onDrop: (files) => setSelectedFile(files[0]),
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET!);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();

      await updateUser({ avatar: data.secure_url });
      setAvatarUrl(data.secure_url);
      setSelectedFile(null);
      toast.success("Profile picture updated");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatePayload: UpdateUserPayload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      };

      if (formData.currentPassword) {
        updatePayload.currentPassword = formData.currentPassword;
      }
      if (formData.newPassword) {
        updatePayload.newPassword = formData.newPassword;
      }

      await updateUser(updatePayload);
      toast.success("Profile updated successfully");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Deletion error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Account deletion failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
      </div>

      <div className="mb-12">
        <div className="w-full flex justify-center flex-row items-center gap-6 mb-4">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-full p-1 ${
              isDragActive ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
          >
            <input {...getInputProps()} />
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) : avatarUrl
                }
              />
              <AvatarFallback className="bg-muted text-4xl">
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3 text-center md:text-left">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleUpload}
                disabled={!selectedFile}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {selectedFile ? "Upload" : "Change Photo"}
              </Button>
              {(avatarUrl || selectedFile) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setAvatarUrl("");
                    setSelectedFile(null);
                    toast.success("Photo removed");
                  }}
                  className="gap-2 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {isDragActive ? "Drop to upload" : "JPG, PNG, WEBP (max 5MB)"}
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Password Settings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end pt-8">
          <Button variant="outline" type="button" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>

        <div className="mt-12 border-t pt-8 space-y-6">
          <div className="text-destructive">
            <h2 className="text-xl font-semibold">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">
              These actions are irreversible. Proceed with caution.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Account Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your profile information</li>
                    <li>All associated data</li>
                    <li>Any active subscriptions</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </div>
  );
};

export default Settings;
