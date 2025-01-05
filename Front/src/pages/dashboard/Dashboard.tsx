import { DataTable } from "../../components/table/data-table";
import { Payment, columns } from "../../components/table/columns";

const Dashboard = () => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      salon: "salon 1",
      services: ["reading"],
      date: "2025-01-10 10:00",
    },
    {
      id: "728ed52e",
      amount: 3100,
      status: "pending",
      salon: "salon 1",
      services: ["reading", "nails", "massage"],
      date: "2025-01-10 10:00",
    },
    {
      id: "728ed52d",
      amount: 120,
      status: "canceled",
      salon: "salon 1",
      services: [],
      date: "2025-01-10 10:00",
    },
    {
      id: "728ed52a",
      amount: 2100,
      status: "canceled",
      salon: "salon 1",
      services: ["reading", "playing"],
      date: "2025-01-10 10:00",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Dashboard;
