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
    Paid: cn(
      "font-medium text-xs px-2 py-0.5 rounded-sm",
      "bg-black text-white hover:bg-black"
    ),
  };

  return <Badge className={statusStyles[status]}>{status}</Badge>;
};

export default StatusBadge;
