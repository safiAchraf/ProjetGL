import StatCard from "../StatCard";
import type { StatCardType } from "../StatCard";

const DashboardCards = () => {
  const CardsData: StatCardType[] = [
    {
      title: "Total Revenue",
      value: "$52.6k",
      trend: "up",
      percentage: "3.4%",
    },
    {
      title: "Total Reservation",
      value: "236",
      trend: "up",
      percentage: "2.1%",
    },
    {
      title: "Total Reviews",
      value: "22",
      trend: "down",
      percentage: "1.1%",
    },
    {
      title: "Average Rating",
      value: "7.3",
      subText: "/10",
      trend: "down",
      percentage: "3.5%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
      {CardsData.map(({ title, value, subText, trend, percentage }) => (
        <StatCard
          title={title}
          value={value}
          subText={subText}
          trend={trend}
          percentage={percentage}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
