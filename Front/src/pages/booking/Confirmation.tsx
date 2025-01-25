/* Hooks */
import { useState } from "react";
import { useNavigate } from "react-router";

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

const Confirmation = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cash" | "points"
  >("cash");
  const [userPoints] = useState(1500);

  const navigate = useNavigate();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      toast.success("Coupon applied successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("Invalid or expired coupon code");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    navigate("/booking/success");
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
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon}
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
                onValueChange={(value: "cash" | "points") =>
                  setSelectedPaymentMethod(value)
                }
                className="space-y-4"
              >
                {/* Pay with Cash */}
                <label
                  htmlFor="cash"
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Pay with Cash</span>
                    <span className="text-muted-foreground text-sm">
                      Pay at the salon during your visit
                    </span>
                  </div>
                </label>

                {/* Pay with Points */}
                <label
                  htmlFor="points"
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                >
                  <RadioGroupItem value="points" id="points" />
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pay with Points</span>
                      <span className="text-sm bg-muted px-2 py-1 rounded">
                        Available: {userPoints} pts
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Redeem your loyalty points
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
              />
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Confirmation;
