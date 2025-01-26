import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
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
import type { Coupon } from "../../types/data";
import { Trash2, Pencil, Loader2 } from "lucide-react";
import { AxiosError } from "axios";

const Coupons = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formState, setFormState] = useState<Coupon>({
    code: "",
    discount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pathname } = useLocation();

  const fetchCoupons = useCallback(async () => {
    try {
      const { data } = await api.get("/api/coupon/salon");
      setCoupons(data.data);
    } catch (error) {
      if ((error as AxiosError).status !== 404) {
        toast.error("Failed to load coupons");
        console.error(error);
      }
      setCoupons([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pathname.includes("coupons")) fetchCoupons();
  }, [pathname, fetchCoupons]);

  const validateForm = () => {
    if (formState.code.length < 3) {
      toast.error("Code must be at least 3 characters");
      return false;
    }
    if (formState.discount < 1) {
      toast.error("Discount must be at least 1");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user) return;

    setIsSubmitting(true);
    try {
      if (editingCoupon) {
        await api.put(`/api/coupon/${editingCoupon.id}`, formState);
      } else {
        await api.post("/api/coupon", formState);
      }
      await fetchCoupons();
      toast.success(editingCoupon ? "Coupon updated!" : "Coupon created!");
      setIsDialogOpen(false);
      setFormState({ code: "", discount: 0 });
    } catch (error) {
      console.error(error);
      toast.error(editingCoupon ? "Update failed" : "Creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    try {
      setDeletingId(id);
      await api.delete(`/api/coupon/${id}`);
      await fetchCoupons();
      toast.success("Coupon deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Deletion failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading coupons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCoupon(null)}>
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Edit Coupon" : "New Coupon"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label>Coupon Code *</Label>
                  <Input
                    value={formState.code}
                    onChange={(e) =>
                      setFormState({ ...formState, code: e.target.value })
                    }
                    placeholder="SUMMER20"
                    required
                  />
                </div>
                <div>
                  <Label>Discount (%) *</Label>
                  <Input
                    type="number"
                    value={formState.discount}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        discount: Number(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                    required
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingCoupon ? "Save" : "Create"}
                </Button>
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center h-24">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}%</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingCoupon(coupon);
                        setFormState(coupon);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteCoupon(coupon.id!)}
                      disabled={deletingId === coupon.id}
                    >
                      {deletingId === coupon.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
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
