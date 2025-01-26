import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { api } from "../../api/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { pathname } = useLocation();

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

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/api/review/salonReviews");
      setReviews(data.data);
    } catch (error) {
      if ((error as AxiosError).status !== 404) {
        toast.error("Failed to load reviews");
        console.error(error);
      }
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pathname.includes("reviews")) fetchCoupons();
  }, [pathname, fetchCoupons]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="h-screen flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-gray-700" />
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

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
