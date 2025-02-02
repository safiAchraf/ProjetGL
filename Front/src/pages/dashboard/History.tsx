/* Hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

/* Components */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import StatusBadge from "../../components/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";

/* Types */
import { Reservation } from "../../types/data";

/* Icons */
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { api } from "../../api/axios";

const History = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleDeleteAll = async () => {
    setIsLoading(true);

    try {
      await api.delete("/api/reservation/user");
    } catch (error) {
      console.error("Error deleting all reservations", error);
    } finally {
      setIsLoading(false);
    }

    setReservations([]);
    setCurrentPage(1);
  };

  const currentItems = reservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);

    const fetchReservations = async () => {
      try {
        const { data } = await api.get("/api/reservation/user");
        setReservations(data.data);
      } catch (error) {
        console.error("Error fetching reservations", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen w-full space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              My Appointments
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Showing {reservations.length} appointments
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full md:w-auto"
                  disabled={reservations.length === 0}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All History
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>
                    Are you sure you want to delete all appointment history?
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This action cannot be undone.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive" onClick={handleDeleteAll}>
                      Confirm Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Appointments per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {totalPages >= 1 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      {isLoading ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="h-[500px] text-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-16 h-16 animate-spin text-gray-700" />
                    <p className="text-gray-600">Loading reviews...</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="py-3">
                  <Button variant="ghost" className="flex items-center gap-1">
                    Services
                  </Button>
                </TableHead>
                <TableHead className="py-3">
                  <Button variant="ghost" className="flex items-center gap-1">
                    Date & Time
                  </Button>
                </TableHead>
                <TableHead className="py-3">
                  <Button variant="ghost" className="flex items-center gap-1">
                    Amount
                  </Button>
                </TableHead>
                <TableHead className="py-3">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-gray-500 align-middle"
                  >
                    No appointments found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((reservation) => (
                  <TableRow key={reservation.id} className="hover:bg-gray-50">
                    <TableCell className="max-w-[200px]">
                      {reservation.services.join(", ")}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(reservation.bookDate)}
                    </TableCell>
                    <TableCell>${reservation.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <StatusBadge status={reservation.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default History;
