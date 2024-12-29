/* Hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";

/* Components */
import Header from "../../components/bookingUI/BookingHeader";
import SalonInfo from "../../components/bookingUI/SalonInfo";
import ServiceTabs from "../../components/bookingUI/ServiceTabs";
import ServicesList from "../../components/bookingUI/ServicesList";

/* Utils */
import { api } from "../../api/axios";
import { toast } from "react-toastify";

/* Types */
import type { Category, Service } from "../../types/data";
import type { CategoryRes } from "../../types/res";

const SelectService = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

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

  const fetchCategories = async () => {
    try {
      const response = await api.get<CategoryRes>("/visitor/categories");
      if (response.status !== 200) {
        throw new Error("Failed to fetch categories.");
      }

      const categories = response.data.categories;
      setCategories(categories);
      setActiveCategory(categories[0]?.name || "");
    } catch (error) {
      toast.error(`Unable to fetch categories. Refreshing!.`, {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        onClose: () => {
          window.location.reload();
        },
      });

      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedSalon.id === "") {
      navigate("/booking/");
    }
  }, [selectedSalon.id, navigate]);

  return (
    <div>
      <Header
        title=""
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons", "Services"]}
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
          <ServicesList
            categories={categories}
            selectedServices={selectedServices}
            onServiceSelect={handleServiceSelect}
          />
        </section>

        <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:static">
          <div className="md:sticky md:top-4">
            {/* <SidePanel
              selectedSalon={selectedSalon}
              selectedServices={selectedServices}
              onContinue={() => navigate("/booking/reservation")}
              currentPage="selectServices"
            /> */}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default SelectService;
