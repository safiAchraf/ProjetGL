/* Icons */
import { Star, StarHalf } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
}

const ReviewStars = ({ rating }: ReviewStarsProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        className="w-3 h-3 fill-yellow-400 text-yellow-400"
      />
    );
  }

  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
  }

  return <div className="flex">{stars}</div>;
};

export default ReviewStars;
