/* Hooks */
import { useNavigate } from "react-router";

/* Components */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

/* Icons */
import { ArrowLeft } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">User Profile</h2>
        </div>

        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/path-to-user-image.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div className="flex gap-2">
              <Button variant="outline">Upload New Photo</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Eastern European Time (EET), Cairo UTC +3
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <form className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="eg. Alaa" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="eg. Mohamed" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">User Name</Label>
            <Input id="username" placeholder="eg. alaa.mohamed" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" />
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-semibold">Change Password</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
