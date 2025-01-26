import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import useAuth from "../../hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import type { Service, Categories } from "../../types/data";
import { Label } from "../../components/ui/label";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router";
import { AxiosError } from "axios";

const Services = () => {
  const categories: Categories[] = [
    "Hair",
    "Nails",
    "Makeup",
    "Skin Care",
    "Massage",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { pathname } = useLocation();
  const initialFormState: Service = {
    name: "",
    description: "",
    price: 0,
    duration: 30,
    category: "Hair",
    pointPrice: 0,
    inHouse: false,
  };

  const { salon } = useAuth();
  const [formData, setFormData] = useState<Service>(initialFormState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const serviceData = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        pointPrice: Number(formData.pointPrice),
      };

      if (editingService) {
        await api.put(`/api/service/${editingService.id}`, serviceData);
      } else {
        await api.post("/api/service", serviceData);
      }
      await fetchServices();
      toast.success(editingService ? "Service updated" : "Service created");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;

    try {
      setDeletingId(id);
      await api.delete(`/api/service/${id}`);
      setServices((services) =>
        services.filter((service) => service.id !== id)
      );
      toast.success("Service deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingService(null);
    setIsDialogOpen(false);
  };

  const fetchServices = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await api.get("/nonauth/services/salon/" + salon!.id);
      console.log(data);
      setServices(data.data);
    } catch (error) {
      console.error(error);
      if ((error as AxiosError).status !== 404)
        toast.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  }, [salon]);

  useEffect(() => {
    if (pathname.includes("services")) fetchServices();
  }, [pathname, fetchServices]);

  if (isLoading) {
    return (
      <div className="h-screen flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Services</h1>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (open) {
              setFormData(initialFormState);
              setEditingService(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>Add Service</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit" : "New"} Service
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Service Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        category: value as Categories,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Price ($)</Label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="101"
                      required
                    />
                  </div>

                  <div>
                    <Label>Duration (min)</Label>
                    <Input
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <Label>Loyalty Points</Label>
                    <Input
                      name="pointPrice"
                      type="number"
                      value={formData.pointPrice}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="inHouse"
                    checked={formData.inHouse}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, inHouse: checked })
                    }
                  />
                  <Label htmlFor="inHouse">In-house Service</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingService ? "Save" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                {service.name}
                <div className="flex gap-2 items-center">
                  <Badge variant="outline">{service.category}</Badge>
                  {service.inHouse && (
                    <Badge variant="secondary">In-House</Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="flex justify-between text-sm">
                <span>${service.price}</span>
                <span>{service.duration} mins</span>
              </div>
              {service.pointPrice > 0 && (
                <div className="text-sm text-muted-foreground">
                  {service.pointPrice} loyalty points
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData(service);
                  setEditingService(service);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(service.id)}
                disabled={deletingId === service.id}
              >
                {deletingId === service.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {!services.length && (
        <div className="text-center py-12 text-muted-foreground">
          No services found
        </div>
      )}
    </div>
  );
};

export default Services;
