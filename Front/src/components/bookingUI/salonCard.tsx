/* Hooks */
import { useMemo } from "react";

/* Components */
import ReviewStars from "../review/reviewStars";

/* Utils */
import type { Salon } from "../../hooks/BookingContext";

/* Icons */
import { MapPin } from "lucide-react";

interface Props {
  salon: Salon;
  isSelected: boolean;
  onSelect: React.Dispatch<React.SetStateAction<Salon>>;
}

const SalonCard = ({ salon, isSelected, onSelect }: Props) => {
  const averageRating = useMemo(() => {
    if (!salon.reviews.length) return 0;
    const total = salon.reviews.reduce((sum, review) => sum + review.rating, 0);
    salon.avgRating = total / salon.reviews.length;

    return salon.avgRating;
  }, [salon]);

  const renderRatingSection = () => {
    if (salon.reviews.length === 0) {
      return <span className="text-sm text-gray-500">No reviews yet</span>;
    }

    return <ReviewStars rating={averageRating} />;
  };

  return (
    <div
      onClick={() => onSelect(salon)}
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
            src={salon.avatar}
            alt={salon.name}
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

          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate">{salon.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;
