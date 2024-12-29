/* Hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useBooking } from "../hooks/useBooking";

/* Custom Components */
import Header from "../components/bookingUI/header";
import SidePanel from "../components/bookingUI/sidePanel";
import ServiceTabs from "../components/bookingUI/serviceTabs";
import ServiceList from "../components/bookingUI/serviceList";

/* Types */
import type { Service } from "../hooks/BookingContext";
import SalonInfo from "../components/salonInfo";

export type Category = {
  id: number;
  name: string;
  services: Service[];
};

const defaultCategories: Category[] = [
  {
    id: 0,
    name: "Cat 1",
    services: [
      {
        id: 0,
        name: "Service 1",
        description: "Description of service 1",
        duration: "90",
        price: 300,
        availableAtHome: true,
      },
      {
        id: 1,
        name: "Service 2",
        description: "Description of service 2",
        duration: "10",
        price: 20,
      },
      {
        id: 2,
        name: "Service 3",
        description: "Description of service 3",
        duration: "30",
        price: 50,
      },
      {
        id: 3,
        name: "Service 4",
        description: "Description of service 4",
        duration: "60",
        price: 100,
        availableAtHome: true,
      },
    ],
  },
  {
    id: 1,
    name: "Cat 2",
    services: [
      {
        id: 4,
        name: "Service 1",
        description: "Description of service 1",
        duration: "90",
        price: 300,
      },
      {
        id: 5,
        name: "Service 2",
        description: "Description of service 2",
        duration: "10",
        price: 20,
      },
      {
        id: 6,
        name: "Service 3",
        description: "Description of service 3",
        duration: "30",
        price: 50,
      },
      {
        id: 7,
        name: "Service 4",
        description: "Description of service 4",
        duration: "60",
        price: 100,
      },
    ],
  },
  {
    id: 2,
    name: "Cat 3",
    services: [
      {
        id: 8,
        name: "Service 1",
        description: "Description of service 1",
        duration: "90",
        price: 300,
      },
      {
        id: 9,
        name: "Service 2",
        description: "Description of service 2",
        duration: "10",
        price: 20,
        availableAtHome: true,
      },
      {
        id: 10,
        name: "Service 3",
        description: "Description of service 3",
        duration: "30",
        price: 50,
      },
      {
        id: 11,
        name: "Service 4",
        description: "Description of service 4",
        duration: "60",
        price: 100,
      },
    ],
  },
  {
    id: 3,
    name: "Cat 4",
    services: [
      {
        id: 12,
        name: "Service 1",
        description: "Description of service 1",
        duration: "90",
        price: 300,
      },
      {
        id: 13,
        name: "Service 2",
        description: "Description of service 2",
        duration: "10",
        price: 20,
      },
      {
        id: 14,
        name: "Service 3",
        description: "Description of service 3",
        duration: "30",
        price: 50,
        availableAtHome: true,
      },
      {
        id: 15,
        name: "Service 4",
        description: "Description of service 4",
        duration: "60",
        price: 100,
      },
    ],
  },
];

const SelectService = () => {
  const [categories] = useState<Category[]>(defaultCategories);
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0].name
  );

  const { selectedSalon, selectedServices, setSelectedServices } = useBooking();
  const navigate = useNavigate();

  const handleServiceSelect = (service: Service) => {
    setSelectedServices((prevSelected: Service[]) => {
      const isAlreadySelected = prevSelected.some(
        (s: Service) => s.id === service.id
      );

      if (isAlreadySelected) {
        return prevSelected.filter((s: Service) => s.id !== service.id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  useEffect(() => {
    if (selectedSalon.id == -1) {
      navigate("/booking/");
    }
  }, [selectedSalon.id, navigate]);

  return (
    <div>
      <Header
        title=""
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Services"]}
      />

      <SalonInfo salon={selectedSalon} />

      <h1 className="text-4xl font-medium mt-8 mb-4">Select Services</h1>

      <ServiceTabs
        categories={categories.map((cat) => cat.name)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="py-6 flex gap-6">
        <section className="flex-grow">
          <ServiceList
            categories={categories}
            selectedServices={selectedServices}
            onServiceSelect={handleServiceSelect}
          />
        </section>

        <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:static">
          <div className="md:sticky md:top-4">
            <SidePanel
              selectedSalon={selectedSalon}
              selectedServices={selectedServices}
              onContinue={() => navigate("/booking/reservation")}
              currentPage="selectServices"
            />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default SelectService;
