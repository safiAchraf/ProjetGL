import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";
import Header from "../../components/bookingUI/BookingHeader";
import SidePanel from "../../components/bookingUI/sidePanel";
import SalonInfo from "../../components/bookingUI/SalonInfo";
import ServicesList from "../../components/bookingUI/ServicesList";
import ReviewsList from "../../components/review/ReviewsList";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import type { AxiosError } from "axios";
import type { Review, Service } from "../../types/data";
import type { ErrorRes, ServicesRes } from "../../types/res";
import type { Error } from "../../types/custom";

const SelectServices = () => {
  const categories = useMemo(
    () => ["Hair", "Skin Care", "Nails", "Makeup", "Massage"],
    []
  );
  const [error, setError] = useState<Error | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews] = useState<Review[]>([]);

  const { selectedSalon, selectedServices, setSelectedServices } = useBooking();
  const navigate = useNavigate();

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setSelectedServices((prev) =>
        prev.some((s) => s.id === service.id)
          ? prev.filter((s) => s.id !== service.id)
          : [...prev, service]
      );
    },
    [setSelectedServices]
  );

  const fetchServices = useCallback(async () => {
    if (!selectedSalon?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get<ServicesRes>(
        `/nonauth/services/salon/${selectedSalon.id}`
      );
      setServices(data.data);
    } catch (err) {
      const error = err as AxiosError<ErrorRes>;
      const message =
        error.response?.data?.message || "Failed to load services";

      setError({
        message,
        status: error.response?.status || 500,
      });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSalon.id]);

  useEffect(() => {
    if (!selectedSalon.id) {
      navigate("/booking", { replace: true });
      return;
    }
    fetchServices();
  }, [fetchServices, selectedSalon.id, navigate]);

  const renderContent = () => {
    if (isLoading) {
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
            <button
              onClick={fetchServices}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <main className="py-6 flex flex-col md:flex-row gap-6">
          <section className="flex-grow">
            <ServicesList
              categories={categories}
              services={services}
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
            />
          </section>

          <aside className="md:w-80 w-full md:sticky md:top-4 h-fit">
            <SidePanel
              onContinue={() => navigate("/booking/reservation")}
              currentPage="selectServices"
            />
          </aside>
        </main>

        {reviews.length > 0 && (
          <section id="reviews" className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <ReviewsList reviews={reviews} limit={3} orientation="horizontal" />
          </section>
        )}
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
        {selectedSalon && <SalonInfo salon={selectedSalon} />}
        <h1 className="text-4xl font-medium mt-8 mb-4">Select Services</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default SelectServices;
