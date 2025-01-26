/* Hooks */
import { useState } from "react";
import { useNavigate } from "react-router";
import useBooking from "../../hooks/useBooking";
import useAuth from "../../hooks/useAuth";

/* Components */
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Card } from "../../components/ui/card";
import { Loader2 } from "lucide-react";
import Header from "../../components/bookingUI/BookingHeader";
import SidePanel from "../../components/bookingUI/sidePanel";

/* Utils */
import { toast } from "react-toastify";
import { api } from "../../api/axios";

const Confirmation = () => {
  const {
    selectedServices,
    couponCode,
    setCouponCode,
    price,
    setPrice,
    inHouseServices,
    selectedTime,
    selectedDate,
  } = useBooking();
  const { user } = useAuth();
  const [couponApplied, setCouponApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "Money" | "Points"
  >("Money");

  const navigate = useNavigate();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const serviceIds = selectedServices.map((service) => service.id);
      const response = await api.post("/nonauth/applyCoupon", {
        coupon: couponCode,
        serviceIds,
        priceBeforeCoupon: price,
        // PointsBeforeCoupon: Points,
      });

      if (response.status === 200) setCouponApplied(true);

      setCouponCode(couponCode);
      setPrice(response.data.price);
      // setPoints(response.data.Points)
      toast.success("Coupon applied successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setCouponCode("");
      toast.error(
        error.response?.data?.message || "Invalid or expired coupon code"
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const combineDateAndTime = (date: Date, time: string) => {
    const [hour, min] = time.split(":").map(Number);
    const combinedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      min
    );

    return combinedDate;
  };

  const handleConfirmBooking = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare booking payload
      const bookingPayload = {
        serviceIds: selectedServices.map((service) => ({
          id: service.id,
          inHouse: inHouseServices[service.id!] || false,
        })),
        startTime: combineDateAndTime(selectedDate, selectedTime),
        paymentType: selectedPaymentMethod,
        coupon: couponCode || null,
      };

      // API call
      const response = await api.post("/api/reservation/", bookingPayload);
      console.log(response);

      if (response.status === 201) {
        navigate("/booking/success");
      } else {
        throw new Error("Booking failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full pb-[200px] md:pb-0">
      <Header
        title="Confirm Booking"
        breadcrumbs={["Salons", "Services", "Reservation", "Confirm"]}
        selectedCrumbs={["Salons", "Services", "Reservation", "Confirm"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <main className="md:flex md:gap-6">
          <section className="flex-grow space-y-6">
            {/* Coupon Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Apply Coupon</h2>
              <div className="flex gap-4">
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  disabled={couponApplied}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || couponApplied}
                  className="gap-2"
                >
                  {isApplyingCoupon && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {isApplyingCoupon ? "Applying..." : "Apply"}
                </Button>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={(value: "Money" | "Points") =>
                  setSelectedPaymentMethod(value)
                }
                className="space-y-4"
              >
                {/* Pay with Money */}
                <label
                  htmlFor="Money"
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                >
                  <RadioGroupItem value="Money" id="Money" />
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Pay with Money</span>
                    <span className="text-muted-foreground text-sm">
                      Pay at the salon during your visit
                    </span>
                  </div>
                </label>

                {/* Pay with Points */}
                <label
                  htmlFor="Points"
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                >
                  <RadioGroupItem value="Points" id="Points" />
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pay with Points</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">
                        Available: {user?.points || 0} pts
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Redeem your loyalty Points
                    </span>
                  </div>
                </label>
              </RadioGroup>
            </Card>
          </section>

          {/* Side Panel */}
          <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto">
            <div className="md:sticky md:top-4">
              <SidePanel
                currentPage="confirm"
                onContinue={handleConfirmBooking}
                isSubmitting={isSubmitting}
              />
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Confirmation;
