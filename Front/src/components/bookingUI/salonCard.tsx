/* Utils */
import type { Salon } from "../../hooks/BookingContext";

interface Props {
  salon: Salon;
  isSelected: boolean;
  onSelect: React.Dispatch<React.SetStateAction<Salon>>;
}

const SalonCard = ({ salon, isSelected, onSelect }: Props) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:shadow"
      }`}
      onClick={() => onSelect(salon)}
    >
      <div className="flex flex-col items-center">
        <img
          src={salon.imgURL}
          alt={salon.name}
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <h3 className="font-medium text-lg">{salon.name}</h3>
      </div>
    </div>
  );
};

export default SalonCard;
