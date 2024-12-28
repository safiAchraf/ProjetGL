interface Props {
  selectedTime: string;
  onTimeSelect: React.Dispatch<React.SetStateAction<string>>;
}

const TimePicker = ({ onTimeSelect, selectedTime }: Props) => {
  const timeSlots = [
    "08:00 a.m",
    "09:00 a.m",
    "10:00 a.m",
    "11:00 a.m",
    "12:00 a.m",

    "1:00 p.m",
    "2:00 p.m",
    "3:00 p.m",
    "4:00 p.m",
    "5:00 p.m",
    "6:00 p.m",
    "7:00 p.m",
    "8:00 p.m",
  ];

  return (
    <div className="grid grid-cols-1 gap-2 mt-8">
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
  );
};

export default TimePicker;
