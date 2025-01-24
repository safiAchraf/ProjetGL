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
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { X } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    categoryId: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

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
      id: editingService?.id || Date.now().toString(),
      name: serviceFormData.name,
      description: serviceFormData.description,
      price: Number(serviceFormData.price),
      duration: Number(serviceFormData.duration),
      categoryId: serviceFormData.categoryId,
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
      categoryId: "",
    });
    setIsServiceDialogOpen(false);
    setEditingService(null);
  };

  // Category Form Handlers
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryFormData.name,
    };
    setCategories([...categories, newCategory]);
    setCategoryFormData({ name: "" });
    setIsCategoryDialogOpen(false);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Uncategorized";
  };

  const handleDelete = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));

    // Remove services in this category
    setServices(
      services.filter((service) => service.categoryId !== categoryId)
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <div className="flex gap-2">
          <Dialog
            open={isCategoryDialogOpen}
            onOpenChange={setIsCategoryDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">Manage Categories</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Service Categories</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Category Name</Label>
                  <Input
                    name="name"
                    placeholder="New Category"
                    value={categoryFormData.name}
                    onChange={(e) =>
                      setCategoryFormData({ name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCategoryDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Create Category
                  </Button>
                </div>
              </form>

              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Existing Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-2 group relative"
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
                      >
                        <span>{category.name}</span>
                        <Button
                          variant="ghost"
                          className="p-0 h-3 w-3 flex items-center justify-center rounded-full "
                          onClick={() => handleDeleteCategory(category.id)}
                          aria-label={`Delete ${category.name}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No categories created yet
                    </p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

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
                  value={serviceFormData.categoryId}
                  onValueChange={(value) =>
                    setServiceFormData({
                      ...serviceFormData,
                      categoryId: value,
                    })
                  }
                  required
                  disabled={categories.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
                        categoryId: "",
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
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                {service.name}
                <Badge variant="outline" className="text-sm">
                  {getCategoryName(service.categoryId)}
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
                    price: service.price.toString(),
                    duration: service.duration.toString(),
                    categoryId: service.categoryId,
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
