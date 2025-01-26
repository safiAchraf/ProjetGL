/* Hooks */
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

/* Components */
import { Button } from "../../components/ui/button";
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

/* Types */
import { Reservation } from "../../types/data";

/* Icons */
import {
  CheckCircle2,
  XCircle,
  Search,
  ArrowUpDown,
  Loader2,
} from "lucide-react";

const defaultData: Reservation[] = [
  {
    id: "1",
    client: "Emily Johnson",
    services: ["Haircut", "Beard Trim"],
    bookDate: "2024-03-15T09:30:00",
    amount: 65.0,
    status: "Pending",
  },
  {
    id: "2",
    client: "Michael Chen",
    services: ["Full Color", "Deep Conditioning"],
    bookDate: "2024-03-16T14:15:00",
    amount: 185.5,
    status: "Confirmed",
  },
  {
    id: "3",
    client: "Sarah Williams",
    services: ["Hot Stone Massage"],
    bookDate: "2024-03-17T16:45:00",
    amount: 120.0,
    status: "Cancelled",
  },
  {
    id: "4",
    client: "David Miller",
    services: ["Manicure", "Pedicure"],
    bookDate: "2024-03-18T11:00:00",
    amount: 75.25,
    status: "Pending",
  },
  {
    id: "5",
    client: "Olivia Davis",
    services: ["Haircut", "Scalp Treatment"],
    bookDate: "2024-03-19T15:30:00",
    amount: 95.0,
    status: "Confirmed",
  },
  {
    id: "6",
    client: "James Wilson",
    services: ["Facial", "Eyebrow Shaping"],
    bookDate: "2024-03-20T10:45:00",
    amount: 135.75,
    status: "Pending",
  },
  {
    id: "7",
    client: "Sophia Martinez",
    services: ["Body Scrub", "Massage"],
    bookDate: "2024-03-21T13:15:00",
    amount: 210.0,
    status: "Confirmed",
  },
  {
    id: "8",
    client: "Liam Anderson",
    services: ["Hair Extensions"],
    bookDate: "2024-03-22T17:30:00",
    amount: 300.0,
    status: "Pending",
  },
  {
    id: "9",
    client: "Emma Taylor",
    services: ["Makeup Application"],
    bookDate: "2024-03-23T12:00:00",
    amount: 85.5,
    status: "Cancelled",
  },
  {
    id: "10",
    client: "Noah Brown",
    services: ["Keratin Treatment"],
    bookDate: "2024-03-24T14:45:00",
    amount: 150.0,
    status: "Confirmed",
  },
  {
    id: "11",
    client: "Ava Garcia",
    services: ["Waxing", "Skin Treatment"],
    bookDate: "2024-03-25T16:30:00",
    amount: 90.0,
    status: "Pending",
  },
  {
    id: "12",
    client: "William Rodriguez",
    services: ["Haircut", "Shave"],
    bookDate: "2024-03-26T09:15:00",
    amount: 55.0,
    status: "Confirmed",
  },
  {
    id: "13",
    client: "Isabella Hernandez",
    services: ["Full Body Massage"],
    bookDate: "2024-03-27T18:00:00",
    amount: 175.0,
    status: "Pending",
  },
  {
    id: "14",
    client: "Mason Lopez",
    services: ["Hair Coloring", "Blow Dry"],
    bookDate: "2024-03-28T10:30:00",
    amount: 145.0,
    status: "Cancelled",
  },
  {
    id: "15",
    client: "Mia Gonzalez",
    services: ["Lash Extensions"],
    bookDate: "2024-03-29T15:45:00",
    amount: 110.0,
    status: "Confirmed",
  },
  {
    id: "16",
    client: "Benjamin Perez",
    services: ["Beard Trim", "Facial"],
    bookDate: "2024-03-30T11:15:00",
    amount: 80.0,
    status: "Pending",
  },
  {
    id: "17",
    client: "Charlotte Torres",
    services: ["Pedicure", "Nail Art"],
    bookDate: "2024-04-01T14:00:00",
    amount: 65.0,
    status: "Confirmed",
  },
  {
    id: "18",
    client: "Elijah Flores",
    services: ["Hot Towel Shave"],
    bookDate: "2024-04-02T16:30:00",
    amount: 45.0,
    status: "Pending",
  },
  {
    id: "19",
    client: "Amelia Rivera",
    services: ["Haircut", "Highlights"],
    bookDate: "2024-04-03T10:45:00",
    amount: 125.0,
    status: "Cancelled",
  },
  {
    id: "20",
    client: "Lucas Scott",
    services: ["Deep Tissue Massage"],
    bookDate: "2024-04-04T13:15:00",
    amount: 195.0,
    status: "Confirmed",
  },
];

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>(defaultData);
  const [fakeLoading, setFakeLoading] = useState(true);
  const { isLoading } = useAuth();

  // Sorting state
  const [sortKey, setSortKey] = useState<keyof Reservation | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Add status filter state
  const [statusFilter, setStatusFilter] = useState<
    Reservation["status"] | "all"
  >("all");

  // Handle status update
  const handleUpdateStatus = (id: string, newStatus: Reservation["status"]) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  // Sorting handler
  const handleSort = (key: keyof Reservation) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Search and filter
  const filteredReservations = reservations.filter((reservation) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      reservation.client.toLowerCase().includes(searchLower) ||
      reservation.status.toLowerCase().includes(searchLower) ||
      reservation.services.some((service) =>
        service.toLowerCase().includes(searchLower)
      );

    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort data
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (!sortKey) return 0;

    if (sortKey === "bookDate") {
      const dateA = new Date(a.bookDate).getTime();
      const dateB = new Date(b.bookDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }

    // Existing comparison logic for other fields
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
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

  // Date formatting
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

  useEffect(() => {
    const timeout = setTimeout(() => setFakeLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [fakeLoading]);

  if (isLoading || fakeLoading) {
    return (
      <div className="h-screen flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen w-full space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Reservation Management
          </h1>
          <p className="text-sm text-gray-500">
            Total reservations: {filteredReservations.length}
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients or status..."
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
              setStatusFilter(value as Reservation["status"] | "all");
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
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Rows per page:</span>
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
        <Table className="relative">
          <TableHeader className="bg-gray-50">
            <TableRow>
              {["client", "services", "bookDate", "amount", "status"].map(
                (header) => (
                  <TableHead key={header} className="py-3">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(header as keyof Reservation)}
                      className="flex items-center gap-1 px-2 hover:bg-gray-100"
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                      <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />
                    </Button>
                  </TableHead>
                )
              )}
              <TableHead className="text-left py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.map((reservation) => (
              <TableRow
                key={reservation.id}
                className="hover:bg-gray-50 h-[60px]"
              >
                <TableCell className="font-medium h-[60px] align-middle">
                  {reservation.client}
                </TableCell>
                <TableCell className="max-w-[200px] truncate h-[60px] align-middle">
                  {reservation.services.join(", ")}
                </TableCell>
                <TableCell className="h-[60px] align-middle">
                  {formatDateTime(reservation.bookDate)}
                </TableCell>
                <TableCell className="h-[60px] align-middle">
                  ${reservation.amount.toFixed(2)}
                </TableCell>
                <TableCell className="h-[60px] align-middle">
                  <StatusBadge status={reservation.status} />
                </TableCell>
                <TableCell className="text-left space-x-2 h-[60px] align-middle">
                  {reservation.status === "Pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:bg-green-50 border-green-100 hover:text-green-600"
                        onClick={() =>
                          handleUpdateStatus(reservation.id, "Confirmed")
                        }
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-600 hover:bg-red-50 border-red-100"
                        onClick={() =>
                          handleUpdateStatus(reservation.id, "Cancelled")
                        }
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No reservations found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
