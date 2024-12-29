/* Hooks */
import { useState, useEffect, useRef } from "react";

/* Components */
import { toast } from "react-toastify";

/* Icons */
import { Eye, EyeClosed } from "lucide-react";

/* Styles */
import "react-toastify/dist/ReactToastify.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const loginData = {
      email,
      password,
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        onClose();
        setEmail("");
        setPassword("");
      } else {
        toast.error(data?.message || "Invalid credentials.");
      }
    } catch {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }

    onClose();
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Log In</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-4xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-4">Log in to complete your booking</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
            required
            autoFocus
          />

          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
