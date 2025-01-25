/* Hooks */
import { useState } from "react";
import { useDropzone } from "react-dropzone";

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
import { Trash2, Upload } from "lucide-react";

const MOCK_SALON: Salon = {
  id: "1",
  name: "Safi Salon",
  description: "Premium beauty experience in the heart of the city",
  address: "123 Beauty Street",
  city: "Los Angeles",
  phoneNumber: "(555) 123-4567",
  pictures: [
    {
      id: "1",
      url: "https://source.unsplash.com/random/800x600/?salon,1",
      salonId: "1",
      createdAt: "2024-02-01",
      updatedAt: "2024-02-01",
    },
    {
      id: "2",
      url: "https://source.unsplash.com/random/800x600/?salon,2",
      salonId: "1",
      createdAt: "2024-02-01",
      updatedAt: "2024-02-01",
    },
  ],
  ownerId: "1",
  owner: "Achraf",
  createdAt: "2024-02-01",
  updatedAt: "2024-02-01",
  rating: 4.9,
};

const Salon = () => {
  const [salon, setSalon] = useState<Salon>(MOCK_SALON);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

    const newPictures: Picture[] = selectedFiles.map((file, index) => ({
      id: `mock-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      salonId: salon.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    setSalon({
      ...salon,
      pictures: [...salon.pictures, ...newPictures],
    });

    setSelectedFiles([]);
    toast.success("Images uploaded successfully");
  };

  const deleteImage = (pictureId: string) => {
    setSalon({
      ...salon,
      pictures: salon.pictures.filter((pic) => pic.id !== pictureId),
    });
    toast.success("Image deleted successfully");
  };

  const saveSalonInfo = () => {
    toast.success("Salon information updated successfully");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold">Manage Your Salon</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Salon Name</Label>
            <Input
              className="rounded-lg h-12"
              name="name"
              value={salon.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Phone Number</Label>
            <Input
              className="rounded-lg h-12"
              name="phoneNumber"
              value={salon.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            className="rounded-lg min-h-[120px]"
            name="description"
            value={salon.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Address</Label>
            <Input
              className="rounded-lg h-12"
              name="address"
              value={salon.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">City</Label>
            <Input
              className="rounded-lg h-12"
              name="city"
              value={salon.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-8">
          <Label className="text-sm font-medium">Salon Gallery</Label>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {salon.pictures.map((picture) => (
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
