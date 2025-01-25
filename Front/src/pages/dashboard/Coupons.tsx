/* Hooks */
import { useState } from "react";

/* Utils */
import { format } from "date-fns";
import { toast } from "react-toastify";

/* Components */
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";

/* Icons */
import { Trash2, Pencil } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expirationDate: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

const mockData: Coupon[] = [
  {
    id: "1",
    code: "SUMMER20",
    discountType: "percentage",
    discountValue: 20,
    expirationDate: new Date("2024-08-31"),
    usageLimit: 100,
    usedCount: 45,
    isActive: true,
  },
  {
    id: "2",
    code: "WINTER15",
    discountType: "percentage",
    discountValue: 15,
    expirationDate: new Date("2024-12-31"),
    usageLimit: 50,
    usedCount: 10,
    isActive: true,
  },
  {
    id: "3",
    code: "FALL25",
    discountType: "fixed",
    discountValue: 25,
    expirationDate: new Date("2024-10-15"),
    usageLimit: 200,
    usedCount: 150,
    isActive: true,
  },
  {
    id: "4",
    code: "SPRING10",
    discountType: "percentage",
    discountValue: 10,
    expirationDate: new Date("2025-03-31"),
    usageLimit: 30,
    usedCount: 5,
    isActive: true,
  },
];

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formState, setFormState] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 0,
    expirationDate: new Date(),
    usageLimit: 0,
  });
  const [, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formState.code.length < 3) {
      newErrors.code = "Code must be at least 3 characters";
    }
    if (formState.discountValue < 1) {
      newErrors.discountValue = "Discount value must be at least 1";
    }
    if (formState.usageLimit < 1) {
      newErrors.usageLimit = "Usage limit must be at least 1";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const couponData = {
      ...formState,
      id: editingCoupon?.id || Math.random().toString(36).substr(2, 9),
      usedCount: editingCoupon?.usedCount || 0,
      isActive: true,
    };

    setCoupons((prev) =>
      editingCoupon
        ? prev.map((c) => (c.id === editingCoupon.id ? couponData : c))
        : [...prev, couponData]
    );

    toast.success(editingCoupon ? "Coupon updated!" : "Coupon created!");
    setIsDialogOpen(false);
    setFormState({
      code: "",
      discountType: "percentage",
      discountValue: 0,
      expirationDate: new Date(),
      usageLimit: 0,
    });
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
    toast.success("Coupon deleted!");
  };

  const getStatus = (coupon: Coupon) => {
    if (!coupon.isActive) return "Inactive";
    if (coupon.usedCount >= coupon.usageLimit) return "Expired";
    if (new Date() > coupon.expirationDate) return "Expired";
    return "Active";
  };

  const statusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Expired":
        return "destructive";
      case "Inactive":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingCoupon(null);
                setFormState({
                  code: "",
                  discountType: "percentage",
                  discountValue: 0,
                  expirationDate: new Date(),
                  usageLimit: 0,
                });
              }}
            >
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Edit Coupon" : "Create Coupon"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label>Coupon Code</Label>
                  <Input
                    value={formState.code}
                    onChange={(e) =>
                      setFormState({ ...formState, code: e.target.value })
                    }
                    placeholder="SUMMER20"
                  />
                </div>

                <div>
                  <Label>Discount Type</Label>
                  <Select
                    value={formState.discountType}
                    onValueChange={(value) =>
                      setFormState({
                        ...formState,
                        discountType: value as "percentage" | "fixed",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    value={formState.discountValue}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        discountValue: Number(e.target.value),
                      })
                    }
                    placeholder="20"
                  />
                </div>

                <div>
                  <Label>Expiration Date</Label>
                  <Input
                    type="date"
                    value={format(formState.expirationDate, "yyyy-MM-dd")}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        expirationDate: new Date(e.target.value),
                      })
                    }
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>

                <div>
                  <Label>Usage Limit</Label>
                  <Input
                    type="number"
                    value={formState.usageLimit}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        usageLimit: Number(e.target.value),
                      })
                    }
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">{coupon.code}</TableCell>
                <TableCell>
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </TableCell>
                <TableCell>
                  {format(coupon.expirationDate, "MM/dd/yyyy")}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{coupon.usedCount}</span> /{" "}
                  {coupon.usageLimit}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(getStatus(coupon))}>
                    {getStatus(coupon)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingCoupon(coupon);
                      setIsDialogOpen(true);
                      setFormState({
                        code: coupon.code,
                        discountType: coupon.discountType,
                        discountValue: coupon.discountValue,
                        expirationDate: coupon.expirationDate,
                        usageLimit: coupon.usageLimit,
                      });
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteCoupon(coupon.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Coupons;
