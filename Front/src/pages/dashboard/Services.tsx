import { useState } from "react";
import { Button } from "../../components/ui/button";
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
import { Categories } from "../../types/data";

interface Service {
  id?: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: Categories;
}

const Services = () => {
  const categories = ["Hair", "Nails", "Makeup", "Skin Care", "Massage"];

  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceFormData, setServiceFormData] = useState<Service>({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
  });
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  // Service Form Handlers
  const handleServiceInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setServiceFormData({
      ...serviceFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: Date.now().toString(),
      name: serviceFormData.name,
      description: serviceFormData.description,
      price: serviceFormData.price,
      duration: serviceFormData.duration,
      category: serviceFormData.category,
    };

    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id ? newService : service
        )
      );
    } else {
      setServices([...services, newService]);
    }

    setServiceFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
    });
    setIsServiceDialogOpen(false);
    setEditingService(null);
  };

  const handleDelete = (serviceId: string | undefined) => {
    if (serviceId)
      setServices(services.filter((service) => service.id !== serviceId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Services</h1>

        <Dialog
          open={isServiceDialogOpen}
          onOpenChange={setIsServiceDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="default">Add New Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Create New Service"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Service Name"
                value={serviceFormData.name}
                onChange={handleServiceInputChange}
                required
              />

              <Select
                value={serviceFormData.category}
                onValueChange={(value: Categories) =>
                  setServiceFormData({
                    ...serviceFormData,
                    category: value,
                  })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                  {categories.length === 0 && (
                    <SelectItem value="no-category" disabled>
                      Create categories first
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={serviceFormData.price}
                  onChange={handleServiceInputChange}
                  required
                />
                <Input
                  name="duration"
                  type="number"
                  placeholder="Duration (minutes)"
                  value={serviceFormData.duration}
                  onChange={handleServiceInputChange}
                  required
                />
              </div>

              <Textarea
                name="description"
                placeholder="Description"
                value={serviceFormData.description}
                onChange={handleServiceInputChange}
                required
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsServiceDialogOpen(false);
                    setServiceFormData({
                      name: "",
                      category: "",
                      description: "",
                      duration: "",
                      price: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  {editingService ? "Update" : "Create"}
                </Button>
              </div>

              <input
                type="text"
                value={serviceFormData.category}
                onChange={() => {}}
                required
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                {service.name}
                <Badge variant="outline" className="text-sm">
                  {service.category}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="flex justify-between text-sm">
                <span className="font-medium">${service.price}</span>
                <span className="text-muted-foreground">
                  {service.duration} mins
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingService(service);
                  setServiceFormData({
                    name: service.name,
                    description: service.description,
                    price: service.price,
                    duration: service.duration,
                    category: service.category,
                  });
                  setIsServiceDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No services found. Create categories first, then add services.
        </div>
      )}
    </div>
  );
};

export default Services;
