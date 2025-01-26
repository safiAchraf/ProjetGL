/* Hooks */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";

/* Components */
import Header from "../../components/bookingUI/BookingHeader";
import SalonCard from "../../components/bookingUI/SalonCard";

/* Utils */
import { api } from "../../api/axios";
import { toast } from "react-toastify";

/* Types */
import type { Error } from "../../types/custom";
import type { Salon } from "../../types/data";
import type { SalonRes } from "../../types/res";
import type { AxiosError } from "axios";

/* Assets */
import { Loader2 } from "lucide-react";

const SelectSalon = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { selectedSalon, setSelectedSalon } = useBooking();
  const navigate = useNavigate();

  const fetchSalons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<SalonRes>("/nonauth/salons");
      const fetchedSalons = await response.data.data;

      if (fetchedSalons.length === 0) {
        setError({
          status: 404,
          message: "No salons available at the moment.",
        });
        return;
      }

      setSalons(fetchedSalons);
    } catch (err) {
      const error = err as AxiosError;

      if (error.status === 404) {
        setError({
          status: 404,
          message: "No salons available at the moment.",
        });
      } else {
        setError({
          message: error.message,
        });
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (salons.length > 0 && !selectedSalon.id) {
      setSelectedSalon(salons[0]);
    }
  }, [salons, selectedSalon.id, setSelectedSalon]);

  useEffect(() => {
    fetchSalons();
  }, [fetchSalons]);

  const handleContinue = () => {
    if (!selectedSalon.id) {
      toast.warning("Please select a salon to continue");
      return;
    }

    navigate("/booking/services");
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
            <p className="text-gray-600">Loading salons...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-gray-600">{error.message}</p>
            {error.status !== 404 && (
              <button
                onClick={fetchSalons}
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
    );
  };

  return (
    <main className="min-h-full flex flex-col relative pb-24">
      <Header
        title="Salons"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons"]}
      />

      {renderContent()}

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
