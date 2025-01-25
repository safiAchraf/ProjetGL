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
import { Input } from "../../components/ui/input";
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
import { ArrowLeft, ArrowUpDown, Search, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";

const defaults: Reservation[] = [
  {
    id: "RES-1001",
    client: "Emily Johnson",
    services: ["Women's Haircut", "Blow Dry"],
    bookDate: "2024-06-15T09:30:00",
    amount: 75.0,
    status: "Confirmed",
  },
  {
    id: "RES-1002",
    client: "Michael Chen",
    services: ["Men's Hair Coloring", "Scalp Treatment"],
    bookDate: "2024-06-16T14:15:00",
    amount: 145.0,
    status: "Pending",
  },
  {
    id: "RES-1003",
    client: "Sarah Williams",
    services: ["Hot Stone Massage (60min)"],
    bookDate: "2024-06-17T16:45:00",
    amount: 120.0,
    status: "Completed",
  },
  {
    id: "RES-1004",
    client: "David Miller",
    services: ["Gel Manicure", "Spa Pedicure"],
    bookDate: "2024-06-18T11:00:00",
    amount: 85.0,
    status: "Confirmed",
  },
  {
    id: "RES-1005",
    client: "Olivia Davis",
    services: ["Balayage Highlights", "Hair Treatment"],
    bookDate: "2024-06-19T15:30:00",
    amount: 210.0,
    status: "Confirmed",
  },
  {
    id: "RES-1006",
    client: "James Wilson",
    services: ["Beard Trim", "Facial"],
    bookDate: "2024-06-20T10:45:00",
    amount: 65.0,
    status: "Cancelled",
  },
  {
    id: "RES-1007",
    client: "Sophia Martinez",
    services: ["Full Body Massage", "Aromatherapy"],
    bookDate: "2024-06-21T13:15:00",
    amount: 150.0,
    status: "Pending",
  },
  {
    id: "RES-1008",
    client: "Liam Anderson",
    services: ["Kids Haircut"],
    bookDate: "2024-06-22T17:30:00",
    amount: 40.0,
    status: "Confirmed",
  },
  {
    id: "RES-1009",
    client: "Emma Taylor",
    services: ["Bridal Makeup Trial"],
    bookDate: "2024-06-23T12:00:00",
    amount: 95.0,
    status: "Completed",
  },
  {
    id: "RES-1010",
    client: "Noah Brown",
    services: ["Keratin Smoothing Treatment"],
    bookDate: "2024-06-24T14:45:00",
    amount: 180.0,
    status: "Confirmed",
  },
  {
    id: "RES-1011",
    client: "Ava Garcia",
    services: ["Lash Extensions", "Brow Lamination"],
    bookDate: "2024-06-25T16:30:00",
    amount: 135.0,
    status: "Pending",
  },
  {
    id: "RES-1012",
    client: "William Rodriguez",
    services: ["Men's Grooming Package"],
    bookDate: "2024-06-26T09:15:00",
    amount: 90.0,
    status: "Confirmed",
  },
  {
    id: "RES-1013",
    client: "Isabella Hernandez",
    services: ["Deep Tissue Massage"],
    bookDate: "2024-06-27T18:00:00",
    amount: 110.0,
    status: "Completed",
  },
  {
    id: "RES-1014",
    client: "Mason Lopez",
    services: ["Haircut", "Beard Shape Up"],
    bookDate: "2024-06-28T10:30:00",
    amount: 55.0,
    status: "Cancelled",
  },
  {
    id: "RES-1015",
    client: "Mia Gonzalez",
    services: ["Microdermabrasion Facial"],
    bookDate: "2024-06-29T15:45:00",
    amount: 95.0,
    status: "Confirmed",
  },
  {
    id: "RES-1016",
    client: "Benjamin Perez",
    services: ["Hot Towel Shave", "Scalp Massage"],
    bookDate: "2024-06-30T11:15:00",
    amount: 60.0,
    status: "Pending",
  },
  {
    id: "RES-1017",
    client: "Charlotte Torres",
    services: ["Nail Art Design", "Spa Pedicure"],
    bookDate: "2024-07-01T14:00:00",
    amount: 75.0,
    status: "Confirmed",
  },
  {
    id: "RES-1018",
    client: "Elijah Flores",
    services: ["Teen Haircut"],
    bookDate: "2024-07-02T16:30:00",
    amount: 35.0,
    status: "Completed",
  },
  {
    id: "RES-1019",
    client: "Amelia Rivera",
    services: ["Color Correction", "Olaplex Treatment"],
    bookDate: "2024-07-03T10:45:00",
    amount: 250.0,
    status: "Confirmed",
  },
  {
    id: "RES-1020",
    client: "Lucas Scott",
    services: ["Couples Massage Package"],
    bookDate: "2024-07-04T13:15:00",
    amount: 220.0,
    status: "Pending",
  },
];

const Orders = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Reservation;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | Reservation["status"]
  >("all");

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handleSort = (key: keyof Reservation) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
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

  const handleDeleteAll = () => {
    setReservations([]);
    setCurrentPage(1);
  };

  const filteredReservations = reservations.filter((res) => {
    const searchLower = searchQuery.toLowerCase();

    // Format date for search
    const formattedDate = formatDateTime(res.bookDate).toLowerCase();

    const matchesSearch =
      res.services.join(" ").toLowerCase().includes(searchLower) ||
      formattedDate.includes(searchLower);

    const matchesStatus = statusFilter === "all" || res.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (!sortConfig) return 0;

    // Sorting for numeric values (amount)
    if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    }

    // Sorting for date values
    if (sortConfig.key === "bookDate") {
      const dateA = new Date(a.bookDate).getTime();
      const dateB = new Date(b.bookDate).getTime();
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    }

    // Sorting for status using custom order
    if (sortConfig.key === "status") {
      const statusOrder = ["Pending", "Confirmed", "Completed", "Cancelled"];
      const comparison =
        statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    // Sorting for services (alphabetical)
    if (sortConfig.key === "services") {
      const servicesA = a.services.join(", ");
      const servicesB = b.services.join(", ");
      return sortConfig.direction === "asc"
        ? servicesA.localeCompare(servicesB)
        : servicesB.localeCompare(servicesA);
    }

    return 0;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedReservations.length / itemsPerPage);

  useEffect(() => {
    setReservations(defaults);
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
            Showing {filteredReservations.length} appointments
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search appointments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as typeof statusFilter);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Search and filter inputs */}

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
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("services")}
                  className="flex items-center gap-1"
                >
                  Services
                  <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />
                  {sortConfig?.key === "services" && (
                    <span className="sr-only">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("bookDate")}
                  className="flex items-center gap-1"
                >
                  Date & Time
                  <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />
                  {sortConfig?.key === "bookDate" && (
                    <span
                      className={`transform ${
                        sortConfig.direction === "asc" ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="py-3">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("amount")}
                  className="flex items-center gap-1"
                >
                  Amount
                  <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />
                  {sortConfig?.key === "amount" && (
                    <span
                      className={`${
                        sortConfig.direction === "asc" ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </span>
                  )}
                </Button>
              </TableHead>
              <TableHead className="py-3">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.map((reservation) => (
              <TableRow key={reservation.id} className="hover:bg-gray-50">
                <TableCell className="max-w-[200px]">
                  {reservation.services.join(", ")}
                </TableCell>
                <TableCell>{formatDateTime(reservation.bookDate)}</TableCell>
                <TableCell>${reservation.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <StatusBadge status={reservation.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No appointments found matching your criteria
            </div>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Orders;
