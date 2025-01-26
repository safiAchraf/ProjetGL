/* Hooks */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import useAuth from "../../hooks/useAuth";

/* Components */
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

/* Utils */
import { toast } from "react-toastify";

/* Types */
import type { Salon, Picture } from "../../types/data";

/* Icons */
import { Loader2, Trash2, Upload } from "lucide-react";

const Salon = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { salon, setSalon, isLoading } = useAuth();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSalon({ ...salon, [e.target.name]: e.target.value });
  };

  const uploadImages = async () => {
    if (!selectedFiles.length) return;

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET!);
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME!);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Upload failed");
        const data = await response.json();

        return {
          id: data.public_id,
          url: data.secure_url,
          salonId: salon.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Picture;
      });

      const newPictures = await Promise.all(uploadPromises);
      setSalon((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...newPictures],
      }));
      setSelectedFiles([]);
      toast.success("Images uploaded to Cloudinary");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const deleteImage = async (pictureId: string) => {
    try {
      const timestamp = Date.now();
      const signature = await createSignature(pictureId, timestamp);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: pictureId,
            api_key: import.meta.env.VITE_API_KEY,
            signature: signature,
            timestamp: timestamp,
          }),
        }
      );

      if (!response.ok) throw new Error("Cloudinary deletion failed");

      // Then update local state
      setSalon((prev) => ({
        ...prev,
        pictures: prev.pictures.filter((pic) => pic.id !== pictureId),
      }));

      toast.success("Image deleted from gallery");
    } catch (error) {
      toast.error("Failed to delete image");
      console.error("Deletion error:", error);
    }
  };

  const createSignature = async (publicId: string, timestamp: number) => {
    const message = `public_id=${publicId}&timestamp=${timestamp}${
      import.meta.env.VITE_API_SECRET
    }`;
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-1",
      encoder.encode(message)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const saveSalonInfo = () => {
    console.log(salon);
    toast.success("Salon information updated successfully");
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading salon info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h2 className="text-3xl font-bold">Manage Your Salon</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Salon Name</Label>
            <Input
              className="rounded-lg h-12"
              name="name"
              value={salon!.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Phone Number</Label>
            <Input
              className="rounded-lg h-12"
              name="phoneNumber"
              value={salon!.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            className="rounded-lg min-h-[120px]"
            name="description"
            value={salon!.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Address</Label>
            <Input
              className="rounded-lg h-12"
              name="address"
              value={salon!.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">City</Label>
            <Input
              className="rounded-lg h-12"
              name="city"
              value={salon!.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Salon Gallery</Label>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {salon!.pictures.map((picture) => (
              <div key={picture.id} className="relative group">
                <img
                  src={picture.url}
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                  alt="Salon image"
                />
                <Button
                  variant="link"
                  size="sm"
                  className="absolute top-2 right-2 p-2.5 rounded-full"
                  onClick={() => deleteImage(picture.id)}
                >
                  <Trash2 className="h-6 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-gray-500" />
                <p className="text-sm text-gray-500">
                  {isDragActive
                    ? "Drop files here"
                    : "Drag & drop images, or click to select"}
                </p>
                <p className="text-xs text-gray-400">
                  JPEG, PNG, WEBP (max 10MB)
                </p>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 p-2.5 rounded-full"
                        onClick={() =>
                          setSelectedFiles((files) =>
                            files.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button onClick={uploadImages} className="w-full h-12">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {selectedFiles.length} images
                </Button>
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full h-12 text-lg rounded-lg"
          onClick={saveSalonInfo}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Salon;
