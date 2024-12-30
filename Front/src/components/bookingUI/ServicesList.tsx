/* Hooks */
import { useEffect, useState } from "react";
import useBooking from "../../hooks/useBooking";

/* Components */
import ServiceCard from "./serviceCard";

/* Utils */
import { api } from "../../api/axios";
import type { Category, Service } from "../../types/data";
import type { ServicesRes } from "../../types/res";
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
  const [services, setServices] = useState<Service[] | null>(null);
  const { selectedSalon } = useBooking();

  const fetchServices = async (): Promise<void> => {
    const response = await api.get<ServicesRes>(
      `/visitor/services/salon/${selectedSalon.id}`
    );
    const services = response.data.data;

    setServices(services);
    console.log(services, categories);
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {categories.map((category, index) => (
        <div key={`${category}-${index}`} id={category.id}>
          <h2 className="text-2xl font-medium mb-4">{category.name}</h2>
          {services
            ?.filter((service) => service.categoryId === category.id)
            .map((service) => (
              <ServiceCard
                key={`${category}-${service.name}-${service.id}`}
                service={service}
                isSelected={selectedServices.some((s) => s.id === service.id)}
                onSelect={onServiceSelect}
              />
            ))}
          {services?.filter((service) => service.categoryId === category.id).length === 0 && (
            <p className="pl-8 mb-4 text-gray-600">No services found for this salon in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
