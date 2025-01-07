/* Hooks */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";

/* Components */
import Header from "../../components/bookingUI/BookingHeader";
import SidePanel from "../../components/bookingUI/sidePanel";
import SalonInfo from "../../components/bookingUI/SalonInfo";
import ServiceTabs from "../../components/bookingUI/ServiceTabs";
import ServicesList from "../../components/bookingUI/ServicesList";

/* Utils */
import { api } from "../../api/axios";
import { toast } from "react-toastify";

/* Types */
import type { AxiosError } from "axios";
import type { Category, Review, Service } from "../../types/data";
import type { CategoryRes, ErrorRes, ServicesRes } from "../../types/res";
import type { Error } from "../../types/custom";

/* Assets */
import { Loader2 } from "lucide-react";
import ReviewsList from "../../components/review/ReviewsList";

const SelectServices = () => {
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [reviews] = useState<Review[]>([]);

  const { selectedSalon, selectedServices, setSelectedServices } = useBooking();
  const navigate = useNavigate();

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setSelectedServices((prevSelected: Service[]) => {
        const isAlreadySelected = prevSelected.some((s) => s.id === service.id);
        return isAlreadySelected
          ? prevSelected.filter((s) => s.id !== service.id)
          : [...prevSelected, service];
      });
    },
    [setSelectedServices]
  );

  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    setError(null);

    try {
      const response = await api.get<CategoryRes>("/visitor/categories");

      const fetchedCategories = response.data.categories;
      if (!fetchedCategories?.length) {
        setError({ status: 404, message: "No service categories available." });
        return;
      }

      setCategories(fetchedCategories);
      setActiveCategory(fetchedCategories[0]?.name || "");
    } catch (err) {
      const error = err as AxiosError;
      setError({ message: "Unable to fetch service categories." });
      toast.error(
        (error.response?.data as ErrorRes)?.message ||
          "Failed to load categories. Please try again."
      );
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    if (!selectedSalon.id) return;

    setIsLoadingServices(true);
    setError(null);

    try {
      const response = await api.get<ServicesRes>(
        `/visitor/services/salon/${selectedSalon.id}`
      );
      setServices(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      setError({ message: "Unable to fetch services." });
      toast.error(
        (error.response?.data as ErrorRes)?.message ||
          "Failed to load services. Please try again."
      );
    } finally {
      setIsLoadingServices(false);
    }
  }, [selectedSalon.id]);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchServices()]);
  }, [fetchCategories, fetchServices]);

  useEffect(() => {
    if (!selectedSalon.id) {
      navigate("/booking/");
    }
  }, [selectedSalon.id, navigate]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      const categoryElement = document.getElementById(
        categories.find((cat) => cat.name === category)?.id || ""
      );
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    [categories]
  );

  const renderContent = () => {
    if (isLoadingCategories || isLoadingServices) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-gray-600">{error.message}</p>
            {error.status !== 404 && (
              <button
                onClick={() =>
                  Promise.all([fetchCategories(), fetchServices()])
                }
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <>
        <ServiceTabs
          categories={categories.map((cat) => cat.name)}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <main className="py-6 flex gap-6">
          <section className="flex-grow">
            <ServicesList
              categories={categories}
              services={services}
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
            />
          </section>

          <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:static shadow-lg md:shadow-none">
            <div className="md:sticky md:top-4">
              <SidePanel
                onContinue={() => navigate("/booking/reservation")}
                currentPage="selectServices"
              />
            </div>
          </aside>
        </main>
        <div id="reviews">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ReviewsList reviews={reviews} limit={3} orientation={"horizontal"} />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title=""
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons", "Services"]}
      />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <SalonInfo salon={selectedSalon} />
        <h1 className="text-4xl font-medium mt-8 mb-4">Select Services</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default SelectServices;
