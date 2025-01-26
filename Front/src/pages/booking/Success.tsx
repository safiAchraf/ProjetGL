/* Hooks */
import { Link, useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";

/* Components */
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Header from "../../components/bookingUI/BookingHeader";

const Success = () => {
  const {
    selectedSalon,
    selectedServices,
    selectedDate,
    selectedTime,
    checkoutLink,
  } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="h-full pb-8">
      <Header
        title="Booking Confirmed"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Success"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <CheckCircle2
              className="w-16 h-16 text-green-600 mx-auto"
              strokeWidth={1.5}
            />

            <h1 className="text-4xl font-bold tracking-tight">
              Booking Confirmed!
            </h1>

            <p className="text-xl text-muted-foreground">
              Thank you for your reservation. We look forward to seeing you!
            </p>

            <div className="space-y-4 text-left">
              <Card className="p-6 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salon:</span>
                    <span className="font-medium">{selectedSalon.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    {<span className="font-medium">{selectedTime}</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Services:</span>
                    <span className="font-medium text-right">
                      {selectedServices
                        .map((service) => service.name)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                <Link
                  to={checkoutLink}
                  className="w-full md:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Processed with checkout
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={() => navigate("/dashboard/orders")}
                >
                  View my bookings
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Success;
