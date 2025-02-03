/* Components */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";
import StatusBadge from "../StatusBadge";

/* Utils */
import { cn } from "../../lib/utils";

/* Types */
import { Reservation } from "../../types/data";

/* Icons */
import { ArrowRight } from "lucide-react";

interface RecentOrdersProps {
  title?: string;
  orders?: Reservation[];
  className?: string;
  newOrdersCount?: number;
  viewAllLink?: string;
}

const DashboardReviews = ({
  title = "Recent Books",
  orders,
  className,
  newOrdersCount = 10,
  viewAllLink = "/dashboard/reservations",
}: RecentOrdersProps) => {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-sm", className)}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {newOrdersCount === 1
              ? `+${newOrdersCount} new order`
              : `+${newOrdersCount} new orders`}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={viewAllLink}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 group transition-all duration-200"
          >
            <span>Go to Reservations Page</span>
            <ArrowRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#8e9091]">ID</TableHead>
              <TableHead className="text-[#8e9091]">Client</TableHead>
              <TableHead className="text-[#8e9091]">Service</TableHead>
              <TableHead className="text-[#8e9091]">Book Date</TableHead>
              <TableHead className="text-[#8e9091]">Amount</TableHead>
              <TableHead className="text-[#8e9091]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!orders || orders.length === 0 ? (
              <TableRow>
                <TableCell>No Orders</TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-[#8e9091]">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.services.join(", ")}</TableCell>
                  <TableCell className="text-[#8e9091]">
                    {order.bookDate}
                  </TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
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

export default DashboardReviews;
