import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
}

const defaults = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing experience! The stylist was very professional and gave me exactly the haircut I wantedAmazing experience! The stylist was very professional and gave me exactly the haircut I wanted.",
    date: "2024-05-15",
    serviceUsed: "Women's Haircut",
  },
  {
    id: "2",
    clientName: "Michael Chen",
    rating: 4,
    comment:
      "Good service overall, but the wait time was a bit longer than expected.",
    date: "2024-05-14",
    serviceUsed: "Men's Coloring",
  },
  {
    id: "3",
    clientName: "Emma Wilson",
    rating: 5,
    comment: "Best facial treatment I've ever had! My skin feels rejuvenated.",
    date: "2024-05-13",
    serviceUsed: "Facial Treatment",
  },
  {
    id: "4",
    clientName: "David Thompson",
    rating: 3,
    comment: "Decent haircut but the stylist seemed rushed. Could be better.",
    date: "2024-05-12",
    serviceUsed: "Men's Haircut",
  },
  {
    id: "5",
    clientName: "Olivia Martinez",
    rating: 5,
    comment: "Absolutely loved my balayage! The color is perfect for summer.",
    date: "2024-05-11",
    serviceUsed: "Hair Coloring",
  },
  {
    id: "6",
    clientName: "James Wilson",
    rating: 4,
    comment: "Good beard trim, but the waiting area could use more seating.",
    date: "2024-05-10",
    serviceUsed: "Beard Trim",
  },
  {
    id: "7",
    clientName: "Sophia Lee",
    rating: 5,
    comment: "Fantastic spa day! The massage was incredibly relaxing.",
    date: "2024-05-09",
    serviceUsed: "Full Spa Package",
  },
  {
    id: "8",
    clientName: "Ethan Brown",
    rating: 2,
    comment: "Disappointing experience. Color didn't turn out as expected.",
    date: "2024-05-08",
    serviceUsed: "Hair Coloring",
  },
  {
    id: "9",
    clientName: "Ava Garcia",
    rating: 5,
    comment: "Perfect eyebrow shaping! Will definitely come back.",
    date: "2024-05-07",
    serviceUsed: "Eyebrow Shaping",
  },
  {
    id: "10",
    clientName: "Noah Rodriguez",
    rating: 4,
    comment: "Good haircut, but the shampoo station was a bit uncomfortable.",
    date: "2024-05-06",
    serviceUsed: "Men's Haircut",
  },
  {
    id: "11",
    clientName: "Isabella Smith",
    rating: 5,
    comment: "Amazing keratin treatment! My hair has never been smoother.",
    date: "2024-05-05",
    serviceUsed: "Keratin Treatment",
  },
  {
    id: "12",
    clientName: "Liam Johnson",
    rating: 4,
    comment: "Solid service, but the music was a bit too loud.",
    date: "2024-05-04",
    serviceUsed: "Men's Grooming",
  },
  {
    id: "13",
    clientName: "Mia Davis",
    rating: 5,
    comment: "Wonderful bridal makeup! Looked perfect all day.",
    date: "2024-05-03",
    serviceUsed: "Bridal Makeup",
  },
  {
    id: "14",
    clientName: "Lucas Miller",
    rating: 3,
    comment: "Average experience. Staff was friendly but rushed.",
    date: "2024-05-02",
    serviceUsed: "Haircut & Shave",
  },
  {
    id: "15",
    clientName: "Charlotte Wilson",
    rating: 5,
    comment: "Best manicure I've ever had! Nails look flawless.",
    date: "2024-05-01",
    serviceUsed: "Gel Manicure",
  },
  {
    id: "16",
    clientName: "Benjamin Moore",
    rating: 4,
    comment: "Good service, but parking was challenging.",
    date: "2024-04-30",
    serviceUsed: "Beard Trim",
  },
  {
    id: "17",
    clientName: "Amelia Taylor",
    rating: 5,
    comment: "Fantastic haircut! Exactly what I asked for.",
    date: "2024-04-28",
    serviceUsed: "Women's Haircut",
  },
  {
    id: "18",
    clientName: "William Anderson",
    rating: 4,
    comment: "Quality service, but the appointment started 15 minutes late.",
    date: "2024-04-27",
    serviceUsed: "Hair Coloring",
  },
  {
    id: "19",
    clientName: "Harper Thomas",
    rating: 5,
    comment: "Outstanding facial! Skin feels amazing.",
    date: "2024-04-25",
    serviceUsed: "Deep Cleansing Facial",
  },
  {
    id: "20",
    clientName: "Daniel White",
    rating: 4,
    comment: "Good experience overall, would recommend to friends.",
    date: "2024-04-24",
    serviceUsed: "Men's Haircut",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-yellow-400 stroke-yellow-400"
              : "fill-gray-200 stroke-gray-300"
          }`}
        />
      ))}
    </div>
  );

  useEffect(() => {
    setReviews(defaults);
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Client Reviews</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Total reviews: {reviews.length}</span>
        </div>
      </div>

      {reviews.length > itemsPerPage && (
        <div className="my-4 -mt-4 flex items-center justify-end gap-4">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            size="sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {currentReviews.map((review) => (
          <Card
            key={review.id}
            className="p-4 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Avatar Placeholder */}
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-300 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {review.clientName.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {review.clientName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.serviceUsed}
                  </Badge>
                </div>

                <div className="mt-2">
                  <RatingStars rating={review.rating} />
                </div>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  );
};

export default Reviews;
