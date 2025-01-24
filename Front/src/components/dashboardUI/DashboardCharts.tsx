/* Hooks */
import { useState } from "react";

/* Components */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../ui/button";

/* Types */
type TimeRange = "day" | "week" | "month" | "year";
type Metric = "revenue" | "reviews" | "reservations" | "rating";

interface ChartDataPoint {
  name: string;
  timestamp: string;
  displayValue: string;
  value: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: { payload: ChartDataPoint }[];
  selectedTimeRange?: TimeRange;
}

/* Constants */
const DATE_FORMATS = {
  day: {
    xAxis: { hour: "numeric", minute: "2-digit", hour12: false } as const,
    tooltip: {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    } as const,
  },
  week: {
    xAxis: { weekday: "short" } as const,
    tooltip: { weekday: "long", month: "short", day: "numeric" } as const,
  },
  month: {
    xAxis: { day: "numeric" } as const,
    tooltip: { month: "short", day: "numeric" } as const,
  },
  year: {
    xAxis: { month: "short" } as const,
    tooltip: { year: "numeric", month: "long" } as const,
  },
} as const;

/* Custom Tooltip */
const CustomTooltip = ({
  active,
  payload,
  selectedTimeRange,
}: TooltipProps) => {
  if (!active || !payload || !payload.length || !selectedTimeRange) return null;

  const { timestamp, value } = payload[0].payload;
  const date = new Date(timestamp);

  const formatOptions = DATE_FORMATS[selectedTimeRange].tooltip;
  const formattedDate = new Intl.DateTimeFormat("en-US", formatOptions).format(
    date
  );

  return (
    <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100 min-w-[160px]">
      <p className="text-gray-500 text-sm mb-1">
        {payload[0].payload.name || "Value"}
      </p>
      <p className="text-lg font-bold">${value.toLocaleString()}</p>
      <p className="text-gray-500 text-sm">{formattedDate}</p>
    </div>
  );
};

const DashboardCharts = () => {
  const [selectedMetric, setSelectedMetric] = useState<Metric>("revenue");
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("week");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const generateTimeData = (
    start: string,
    interval: Record<string, number>,
    count: number
  ) => {
    return Array.from({ length: count }).map((_, i) => {
      const date = new Date(start);
      Object.entries(interval).forEach(([unit, value]) => {
        const setMethod = `set${unit}` as keyof Date;
        const getMethod = `get${unit}` as keyof Date;
        const currentValue = (date[getMethod] as () => number)();
        (date[setMethod] as (value: number) => void)(currentValue + value * i);
      });
      return date.toISOString();
    });
  };

  const metricsData = {
    revenue: {
      title: "Revenue",
      currentValue: "$11.642",
      percentage: "+3.4%",
      trend: "up",
      data: {
        day: generateTimeData("2024-05-27T08:00:00", { Hours: 4 }, 6).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            }),
            value: [400, 700, 1200, 1800, 2100, 2500][i],
          })
        ),
        week: generateTimeData("2024-05-20T00:00:00", { Date: 1 }, 7).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            value: [1000, 3000, 2200, 4000, 2800, 5000, 4600][i],
          })
        ),
        month: generateTimeData("2024-05-01T00:00:00", { Date: 7 }, 4).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: `Week ${i + 1}`,
            value: [12000, 19000, 16000, 25000][i],
          })
        ),
        year: generateTimeData("2024-01-01T00:00:00", { Month: 1 }, 12).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              month: "short",
            }),
            value: [
              48000, 53000, 61000, 49000, 67000, 72000, 68000, 75000, 81000,
              79000, 85000, 90000,
            ][i],
          })
        ),
      },
    },
    reviews: {
      title: "Reviews",
      currentValue: "22",
      percentage: "-1.1%",
      trend: "down",
      data: {
        day: generateTimeData("2024-05-27T00:00:00", { Hours: 4 }, 6).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            }),
            value: [0, 1, 3, 5, 2, 1][i],
          })
        ),
        week: generateTimeData("2024-05-20T00:00:00", { Date: 1 }, 7).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            value: [15, 22, 18, 25, 20, 30, 28][i],
          })
        ),
        month: generateTimeData("2024-05-01T00:00:00", { Date: 7 }, 4).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: `Week ${i + 1}`,
            value: [80, 120, 90, 110][i],
          })
        ),
        year: generateTimeData("2024-01-01T00:00:00", { Month: 1 }, 12).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              month: "short",
            }),
            value: [400, 380, 420, 350, 480, 510, 490, 530, 570, 600, 620, 650][
              i
            ],
          })
        ),
      },
    },
    reservations: {
      title: "Reservations",
      currentValue: "236",
      percentage: "+2.1%",
      trend: "up",
      data: {
        day: generateTimeData("2024-05-27T00:00:00", { Hours: 4 }, 6).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            }),
            value: [10, 5, 20, 35, 40, 25][i],
          })
        ),
        week: generateTimeData("2024-05-20T00:00:00", { Date: 1 }, 7).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            value: [50, 70, 65, 80, 75, 90, 85][i],
          })
        ),
        month: generateTimeData("2024-05-01T00:00:00", { Date: 7 }, 4).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: `Week ${i + 1}`,
            value: [300, 450, 500, 400][i],
          })
        ),
        year: generateTimeData("2024-01-01T00:00:00", { Month: 1 }, 12).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              month: "short",
            }),
            value: [
              2000, 2200, 2500, 2300, 2700, 2900, 2800, 3100, 3300, 3200, 3500,
              3800,
            ][i],
          })
        ),
      },
    },
    rating: {
      title: "Average Rating",
      currentValue: "7.3",
      subText: "/10",
      percentage: "-3.5%",
      trend: "down",
      data: {
        day: generateTimeData("2024-05-27T00:00:00", { Hours: 4 }, 6).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleTimeString([], {
              hour: "numeric",
              hour12: true,
            }),
            value: [7.5, 7.2, 7.8, 8.0, 7.6, 7.4][i],
          })
        ),
        week: generateTimeData("2024-05-20T00:00:00", { Date: 1 }, 7).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            value: [7.3, 7.5, 7.4, 7.6, 7.8, 7.9, 7.7][i],
          })
        ),
        month: generateTimeData("2024-05-01T00:00:00", { Date: 7 }, 4).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: `Week ${i + 1}`,
            value: [7.5, 7.6, 7.4, 7.3][i],
          })
        ),
        year: generateTimeData("2024-01-01T00:00:00", { Month: 1 }, 12).map(
          (ts, i) => ({
            timestamp: ts,
            displayValue: new Date(ts).toLocaleDateString("en-US", {
              month: "short",
            }),
            value: [7.8, 7.7, 7.5, 7.4, 7.3, 7.2, 7.1, 7.0, 6.9, 6.8, 6.7, 6.6][
              i
            ],
          })
        ),
      },
    },
  }; // Mock Data

  const currentMetric = metricsData[selectedMetric];
  const chartData = currentMetric.data[selectedTimeRange];

  // Format Y-axis
  const formatYAxis = (value: number) => {
    if (selectedMetric === "rating") return value.toFixed(1);
    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
  };

  // Format X-axis
  const formatXAxis = (timestamp: string) => {
    const formatOptions =
      DATE_FORMATS[selectedTimeRange as keyof typeof DATE_FORMATS].xAxis;
    return new Intl.DateTimeFormat("en-US", formatOptions).format(
      new Date(timestamp)
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-3">
      <div className="flex justify-between items-center mb-2">
        <Select
          value={selectedMetric}
          onValueChange={(value) => setSelectedMetric(value as Metric)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="reviews">Reviews</SelectItem>
            <SelectItem value="reservations">Reservations</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex space-x-2">
          {["day", "week", "month", "year"].map((range) => (
            <Button
              variant={selectedTimeRange === range ? "default" : "ghost"}
              key={range}
              onClick={() => setSelectedTimeRange(range as TimeRange)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold">{currentMetric.currentValue}</p>
          <p
            className={`text-sm ${
              currentMetric.trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {currentMetric.percentage} from last period
          </p>
        </div>

        <div
          className={`transition-all duration-300 ${
            isMinimized ? "h-0 overflow-hidden" : "h-80"
          }`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                tick={{ fill: "#6B7280" }}
              />
              <YAxis tickFormatter={formatYAxis} tick={{ fill: "#6B7280" }} />
              <Tooltip
                content={
                  <CustomTooltip selectedTimeRange={selectedTimeRange} />
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#colorValue)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
