import { Link as RouterLink } from "react-router";

const Services = () => {
  const services = [
    {
      title: "Manicure",
      image: "/manicure.png",
      className: "lg:col-start-1 lg:col-end-5 lg:row-start-2",
    },
    {
      title: "Hair Care",
      image: "/hair.png",
      className: "lg:col-end-11 lg:col-span-3 lg:row-start-2",
    },
    {
      title: "Additional Services",
      image: "/coffee.png",
      className: "lg:col-end-7 lg:col-span-3 lg:row-start-4",
    },
    {
      title: "Pedicure",
      image: "/pedicure.png",
      className: "lg:col-end-12 lg:col-span-3 lg:row-start-5",
    },
  ];

  const ServiceCard = ({
    title,
    image,
    className,
  }: {
    title: string;
    image: string;
    className: string;
  }) => (
    <div className={`${className} font-normal z-10`} data-aos="fade-up">
      <img src={image} alt={title} className="object-cover w-full" />
      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        <span className="text-2xl mb-2 sm:mb-0">{title}</span>
        <RouterLink
          to="/booking"
          className="border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300"
        >
          Show salon →
        </RouterLink>
      </div>
    </div>
  );

  return (
    <section className="py-16 mx-auto w-10/12" id="Services">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-0">
        {/* Background lines */}
        <div className="hidden lg:block w-px lg:col-start-4 lg:row-start-1 lg:row-end-5 bg-gray-200" />
        <div className="hidden lg:block w-px lg:col-end-9 lg:row-start-2 lg:row-end-6 bg-gray-200" />

        {/* Header */}
        <div
          className="lg:col-end-11 lg:col-span-3 flex flex-col items-start justify-center z-0 lg:mb-10"
          data-aos="fade-up"
        >
          <h2 className="text-4xl lg:text-5xl mb-2">Our Services</h2>
          <p className="text-lg lg:text-xl text-gray-600">Beauty Beyond</p>
        </div>

        {/* Service Cards */}
        {services.map((service, index) => (
          <ServiceCard key={`${service.title}-${index}`} {...service} />
        ))}

        {/* Footer Text */}
        <div
          className="lg:col-start-1 lg:col-end-5 lg:row-start-5 z-10 flex items-center mt-8 lg:mt-0"
          data-aos="fade-up"
        >
          <p className="text-lg lg:text-xl max-w-2xl mx-auto text-left">
            Expert Beauty Services Tailored to Your Unique Style and Needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
