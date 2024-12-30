/* Hooks */
import { useEffect, useState, useCallback } from "react";
import useBooking from "../../hooks/useBooking";

/* Utils */
import { api } from "../../api/axios";

/* Types */
import { AxiosError } from "axios";
import { AvailableHoursRes, ErrorRes } from "../../types/res";

interface Props {
  day: number;
  month: number;
  selectedTime: string;
  onTimeSelect: React.Dispatch<React.SetStateAction<string>>;
}

const TimePicker = ({ day, month, onTimeSelect, selectedTime }: Props) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { selectedSalon } = useBooking();

  const fetchAvailableHours = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<AvailableHoursRes>(
        `/visitor/available/${selectedSalon.id}/${day}/${month}`
      );
      const availableHours = response.data.availableHours;

      setTimeSlots(
        availableHours.map((hour) => hour.toString().padStart(2, "0") + ":00")
      );
    } catch (err) {
      const error = err as AxiosError;
      setError(
        (error.response?.data as ErrorRes)?.message ||
          "Failed to fetch available time slots. Please try again."
      );
      setTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, [day, month, selectedSalon.id]);

  useEffect(() => {
    fetchAvailableHours();
  }, [fetchAvailableHours]);

  return (
    <div className="mt-8">
      {isLoading && <p className="text-gray-500">Loading available times...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 gap-2">
        {!isLoading && !error && timeSlots.length === 0 && (
          <p className="text-gray-500">No available time slots found.</p>
        )}
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`p-3 text-left border rounded-lg ${
              selectedTime === time
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
