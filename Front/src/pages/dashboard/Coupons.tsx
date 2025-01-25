/* Hooks */
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api/axios";

/* Utils */
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

import { Label } from "../../components/ui/label";

/* Types */
import type { Coupon } from "../../types/data";

/* Icons */
import { Trash2, Pencil } from "lucide-react";

const Coupons = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formState, setFormState] = useState({
    code: "",
    discount: 0,
    salonId: "",
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get("/api/coupons");

        if (response.status === 404) {
          toast.info("No coupons found");
          setCoupons([]);
        }

        setCoupons(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load coupons");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const validateForm = () => {
    const errors = [];

    if (formState.code.length < 3) {
      errors.push("Code must be at least 3 characters");
    }
    if (formState.discount < 1) {
      errors.push("Discount must be at least 1");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user) return;

    try {
      if (editingCoupon) {
        const response = await api.put(
          `/api/coupon/${editingCoupon.id}`,
          formState
        );
        setCoupons((prev) =>
          prev.map((c) => (c.id === editingCoupon.id ? response.data : c))
        );
        toast.success("Coupon updated!");
      } else {
        const response = await api.post("/api/coupon", formState);
        setCoupons((prev) => [...prev, response.data]);
        toast.success("Coupon created!");
      }

      setIsDialogOpen(false);
      setFormState({
        code: "",
        discount: 0,
        salonId: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        editingCoupon ? "Failed to update coupon" : "Failed to create coupon"
      );
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      await api.delete(`/api/coupons/${id}`);
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
      toast.success("Coupon deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete coupon");
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading coupons...</div>;
  }

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
                  discount: 0,
                  salonId: "",
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
                  <Label>Discount</Label>
                  <Input
                    type="number"
                    value={formState.discount}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        discount: Number(e.target.value),
                      })
                    }
                    placeholder="20"
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
              <TableHead>Salon ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>${coupon.discount}</TableCell>
                  <TableCell>{coupon.salonId}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingCoupon(coupon);
                        setIsDialogOpen(true);
                        setFormState({
                          code: coupon.code,
                          discount: coupon.discount,
                          salonId: "",
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Coupons;
