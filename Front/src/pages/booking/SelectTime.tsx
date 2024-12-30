/* Hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";

/* Custom Components */
import Header from "../../components/bookingUI/BookingHeader";
import Calendar from "../../components/calendar/calendar";
import TimePicker from "../../components/calendar/timePicker";
import SidePanel from "../../components/bookingUI/sidePanel";
import LoginModal from "../../components/loginModal";
import SignupModal from "../../components/signupModal";

/* Utils */
import { toast } from "react-toastify";

const SelectTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  const { selectedSalon, selectedServices } = useBooking();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    if (selectedServices.length === 0) {
      navigate("/booking/services");
    }

    if (selectedSalon.id === "") {
      navigate("/booking/");
    }
  }, [navigate, selectedSalon.id, selectedServices.length]);

  return (
    <div className="h-full pb-[200px] md:pb-0">
      <Header
        title="Select time"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons", "Services", "Reservation"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <main className="md:flex md:gap-6">
          <section className="flex-grow">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />

            {selectedDate && (
              <TimePicker
                day={selectedDate.getDate()}
                month={selectedDate.getMonth()}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
            )}
          </section>

          <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto">
            <div className="md:sticky md:top-4">
              <SidePanel
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onContinue={handleContinue}
                currentPage="selectTime"
              />
            </div>
          </aside>
        </main>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </div>
  );
};

export default SelectTime;
