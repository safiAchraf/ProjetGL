export type StatCardType = {
  title: string;
  value: string;
  trend?: "up" | "down";
  percentage?: string;
  subText?: string;
};

const StatCard = ({
  title,
  value,
  trend,
  percentage,
  subText,
}: StatCardType) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>

    <p className="text-2xl font-bold mt-1 flex justify-between items-center">
      <p>
        {value}{" "}
        <span className="font-normal text-base text-gray-400">{subText}</span>
      </p>

      {percentage && trend && (
        <p
          className={`text-sm mt-1 ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend === "up" ? "↑" : "↓"} {percentage}
        </p>
      )}
    </p>
  </div>
);

export default StatCard;
