/* Hooks */
import { useState, useMemo, useEffect, useRef } from "react";

/* Components */
import ReviewStars from "../review/reviewStars";
import ReviewsList from "../review/reviewsList";

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
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleReviewToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReviews((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowReviews(false);
    }
  };

  const averageRating = useMemo(() => {
    if (!salon.reviews.length) return 0;
    const total = salon.reviews.reduce((sum, review) => sum + review.rating, 0);
    salon.avgRating = total / salon.reviews.length;

    return salon.avgRating;
  }, [salon]);

  useEffect(() => {
    if (showReviews) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showReviews]);

  const renderRatingSection = () => {
    if (salon.reviews.length === 0) {
      return <span className="text-sm text-gray-500">No reviews yet</span>;
    }

    return (
      <div className="flex items-center mt-1 space-x-1">
        <ReviewStars rating={averageRating} />

        <button
          onClick={handleReviewToggle}
          className="text-sm text-blue-600 hover:underline ml-1"
        >
          ({salon.reviews.length} reviews)
        </button>
      </div>
    );
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
            src={salon.imgURL}
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

      {/* Reviews Section */}
      {showReviews && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 top-full mt-2 w-full bg-white shadow-lg rounded-lg z-10 transition-transform duration-300 ease-in-out origin-top ${
            showReviews ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transform: showReviews ? "scaleY(1)" : "scaleY(0)" }}
        >
          <div className="p-3">
            <ReviewsList reviews={salon.reviews} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonCard;
