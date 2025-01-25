/* Components */
import { Badge } from "./ui/badge";

/* Utils */
import { cn } from "../lib/utils";

/* Types */
import { Reservation } from "../types/data";

const StatusBadge = ({ status }: { status: Reservation["status"] }) => {
  const statusStyles = {
    Pending: cn(
      "font-medium text-xs px-2 py-0.5 rounded-sm",
      "bg-blue-100 text-blue-600 hover:bg-blue-100"
    ),
    Confirmed: cn(
      "font-medium text-xs px-2 py-0.5 rounded-sm",
      "bg-green-100 text-green-600 hover:bg-green-100"
    ),
    Cancelled: cn(
      "font-medium text-xs px-2 py-0.5 rounded-sm",
      "bg-red-200 text-red-600 hover:bg-red-200"
    ),
    Completed: cn(
      "font-medium text-xs px-2 py-0.5 rounded-sm",
      "bg-black text-white hover:bg-black"
    ),
  };

  return <Badge className={statusStyles[status]}>{status}</Badge>;
};

export default StatusBadge;
