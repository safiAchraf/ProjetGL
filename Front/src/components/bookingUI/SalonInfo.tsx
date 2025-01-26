/* Hooks */
import { useState } from "react";

/* Components */
import Carousel from "../carousel";
import ReviewStars from "../review/ReviewStars";
import { Link } from "react-scroll";

/* Utils */
import type { Review, Salon } from "../../types/data";
import ReviewsList from "../review/ReviewsList";

interface SalonInfoProps {
  salon: Salon;
}

const SalonInfo = ({ salon }: SalonInfoProps) => {
  const [reviews] = useState<Review[]>([]);
  const salonImages = salon.pictures.map((picture) => picture.url);
  console.log(salonImages);

  return (
    <section>
      <header className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4">{salon.name}</h1>
        <ReviewStars rating={salon.rating || 0.0} big />
      </header>

      <p className="w-11/12 mx-auto text-zinc-600 text-md mb-4">
        {salon.description}
      </p>

      {salon.pictures.length === 0 ? (
        <div className="w-full mx-auto text-center bg-gray-100 p-6 rounded-lg border border-gray-300 mt-8 mb-6">
          <p className="text-xl text-gray-500 font-semibold">
            No Photos Available
          </p>
          <p className="text-sm text-gray-400 mt-2">
            We're working on uploading more photos. Stay tuned!
          </p>
        </div>
      ) : (
        <Carousel images={salonImages} slidesToShow={salon.pictures.length} />
      )}

      <div className="text-right">
        <h2 className="text-xl font-semibold mb-4 text-start">Reviews</h2>
        <ReviewsList reviews={reviews} limit={3} orientation={"horizontal"} />
        <Link
          to="reviews"
          className="transition ease-in-out duration-50 hover:cursor-pointer"
          spy={true}
          smooth={true}
        >
          Show more...
        </Link>
      </div>
    </section>
  );
};

export default SalonInfo;
