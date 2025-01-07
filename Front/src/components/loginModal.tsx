/* Hooks */
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";

/* Utils */
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ErrorRes, LoginRes } from "../types/res";

/* Assets */
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { setIsAuthenticated, setUser } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setShowPassword(false);
    setIsLoading(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post<LoginRes>("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.data);

        setIsAuthenticated(true);
        toast.success("Login successful!");
        onClose();
      }
    } catch (error) {
      const errorResponse = error as AxiosError;
      toast.error(
        (errorResponse.response?.data as ErrorRes)?.message ||
          "An unexpected error occurred."
      );
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        resetForm();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
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
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-4">Log in to complete your booking</p>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              disabled={isLoading}
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Log in</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
