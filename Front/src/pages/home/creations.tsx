import Carousel from "../../components/carousel";

const creations = () => {
  return (
    <section className="mt-28" id="Creations">
      <div className="w-10/12 flex mx-auto items-center justify-between">
        <div>
          <h2 className="text-4xl lg:text-5xl mb-2 relative z-10 font-light">
            Our Creations
          </h2>
          <p className="text-xl text-gray-600 mb-12 relative z-10">
            Capture Elegance
          </p>
        </div>
        <div>
          <p className="text-xl px-6">
            Custom beauty looks
            <br />
            that highlight your elegance.
          </p>
        </div>
      </div>

      <Carousel
        images={[
          "/carousel1.png",
          "/carousel2.png",
          "/carousel3.png",
          "/carousel4.png",
        ]}
      />
    </section>
  );
};

export default creations;
