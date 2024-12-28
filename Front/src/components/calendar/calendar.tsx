/* Hooks */
import { useState } from "react";

/* Utils */
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfDay,
  isBefore,
} from "date-fns";

/* Icons */
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  selectedDate: Date;
  onDateSelect: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar = ({ onDateSelect, selectedDate }: Props) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfMonth = monthStart.getDay();
  const paddingDays = Array(firstDayOfMonth).fill(null);

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <div>
          <button
            onClick={prevMonth}
            aria-label="Previous Month"
            className="mr-2 p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextMonth}
            aria-label="Next Month"
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}

        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="p-2" />
        ))}

        {monthDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDisabled = isDateDisabled(day);

          return (
            <button
              key={day.toString()}
              onClick={() => !isDisabled && onDateSelect(day)}
              disabled={isDisabled}
              className={`p-2 text-center rounded-full ${
                !isCurrentMonth
                  ? "text-gray-300"
                  : isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
