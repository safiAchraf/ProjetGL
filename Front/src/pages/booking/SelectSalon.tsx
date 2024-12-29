/* Hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";

/* Components */
import Header from "../../components/bookingUI/BookingHeader";
import SalonCard from "../../components/bookingUI/SalonCard";
import { toast } from "react-toastify";

/* Utils */
import { api } from "../../api/axios";
import type { Salon } from "../../types/data";
import type { SalonRes, ErrorRes } from "../../types/res";
import type { AxiosError } from "axios";

/* Assets */
import { Loader2 } from "lucide-react";

const SelectSalon = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedSalon, setSelectedSalon } = useBooking();
  const navigate = useNavigate();

  const fetchSalons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<SalonRes>("/visitor/salons");
      const fetchedSalons = response.data.data;

      if (fetchedSalons.length === 0) {
        setError("No salons available at the moment.");
        return;
      }

      setSalons(fetchedSalons);

      if (!selectedSalon.id && fetchedSalons.length > 0) {
        setSelectedSalon(fetchedSalons[0]);
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        toast.error(
          (err.response.data as ErrorRes).message ||
            "An unexpected error occurred."
        );
      } else if (err.request) {
        toast.error(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    if (!selectedSalon.id) {
      toast.warning("Please select a salon to continue");
      return;
    }
    navigate("/booking/services");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header
          title="Salons"
          breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
          selectedCrumbs={["Salons"]}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
            <p className="text-gray-600">Loading salons...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header
          title="Salons"
          breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
          selectedCrumbs={["Salons"]}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchSalons}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full relative pb-24">
      <Header
        title="Salons"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons"]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {salons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salons.map((salon) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                isSelected={selectedSalon.id === salon.id}
                onSelect={setSelectedSalon}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No salons available at the moment.</p>
          </div>
        )}
      </section>

      <button
        onClick={handleContinue}
        disabled={!selectedSalon.id}
        className={`fixed bottom-8 right-8 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200
          ${
            selectedSalon.id
              ? "bg-white hover:bg-gray-100 hover:scale-105 active:scale-95"
              : "bg-gray-200 cursor-not-allowed"
          }`}
      >
        Continue
      </button>
    </main>
  );
};

export default SelectSalon;
