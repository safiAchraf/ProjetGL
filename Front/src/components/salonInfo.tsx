/* Components */
import Carousel from "./carousel";
import ReviewStars from "./review/reviewStars";
import ReviewsList from "./review/reviewsList";

/* Utils */
import { Salon } from "../hooks/BookingContext";

interface SalonInfoProps {
  salon: Salon;
}

const SalonInfo = ({ salon }: SalonInfoProps) => {
  return (
    <section>
      <header className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4">{salon.name}</h1>
        <ReviewStars rating={salon.avgRating!} big />
      </header>

      <p className="w-11/12 mx-auto text-zinc-600 text-md mb-4">
        {salon.description}
      </p>

      {salon.imgs.length === 0 ? (
        <div className="w-full mx-auto text-center bg-gray-100 p-6 rounded-lg border border-gray-300 mt-8 mb-6">
          <p className="text-xl text-gray-500 font-semibold">
            No Photos Available
          </p>
          <p className="text-sm text-gray-400 mt-2">
            We're working on uploading more photos. Stay tuned!
          </p>
        </div>
      ) : (
        <Carousel images={salon.imgs} slidesToShow={1} />
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <ReviewsList
          reviews={salon.reviews}
          limit={3}
          orientation={"horizontal"}
        />
      </div>
    </section>
  );
};

export default SalonInfo;
