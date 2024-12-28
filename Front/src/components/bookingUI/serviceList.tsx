/* Custom Components */
import ServiceCard from "./serviceCard";

/* Utils */
import type { Service } from "../../hooks/BookingContext";
import type { Category } from "../../booking/selectService";

interface Props {
  categories: Category[];
  selectedServices: Service[];
  onServiceSelect: (service: Service) => void;
}

const ServiceList = ({
  categories,
  selectedServices,
  onServiceSelect,
}: Props) => {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} id={category.name}>
          <h2 className="text-2xl font-medium mb-4">{category.name}</h2>

          {category.services.map((service) => (
            <ServiceCard
              key={`${category.name}-${service.name}-${service.id}`}
              service={service}
              isSelected={selectedServices.some((s) => s.id === service.id)}
              onSelect={onServiceSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
