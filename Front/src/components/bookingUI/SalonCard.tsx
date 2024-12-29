/* Components */
import ReviewStars from "../review/ReviewStars";

/* Utils */
import type { Salon } from "../../types/data";

/* Icons */
import { MapPin } from "lucide-react";

interface Props {
  salon: Salon;
  isSelected: boolean;
  onSelect: React.Dispatch<React.SetStateAction<Salon>>;
}

const SalonCard = ({ salon, isSelected, onSelect }: Props) => {
  const handleCardClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onSelect(salon);
  };

  const renderRatingSection = () => {
    if (salon.rating === null) {
      return <span className="text-sm text-gray-500">No reviews yet</span>;
    }

    return <ReviewStars rating={salon.rating} />;
  };

  return (
    <div
      onClick={handleCardClick}
      className={`p-3 border rounded-lg transition-all relative cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:shadow"
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            src={salon.pictures[0].url}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-base truncate">{salon.name}</h3>
              {renderRatingSection()}
            </div>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {salon.address} - {salon.city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;
