/* Components */
import ReviewStars from "./reviewStars";

/* Utils */
import { Review } from "../../hooks/BookingContext";

interface ReviewsListProps {
  reviews: Review[];
  limit?: number;
  orientation?: "vertical" | "horizontal"; // Restrict to only 'vertical' or 'horizontal'
}

const ReviewsList = ({
  reviews,
  limit = 0,
  orientation = "vertical",
}: ReviewsListProps) => {
  const reviewsToDisplay = limit ? reviews.slice(0, limit) : reviews;

  if (reviewsToDisplay.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-sm text-gray-500">
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`mt-4 ${
        orientation === "horizontal"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-3 max-h-64 overflow-y-scroll"
      }`}
    >
      {reviewsToDisplay.map((review, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">{review.user}</span>
            <ReviewStars rating={review.rating} />
          </div>
          <p className="text-sm text-gray-600">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
