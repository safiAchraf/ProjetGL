import { useState, useEffect, useRef } from "react";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<string>("email");
  const [error, setError] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    setStep("email");
    setError("");
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit}>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
      >
        Continue
      </button>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handlePasswordSubmit}>
      <div className="mb-4 flex items-center">
        <button
          type="button"
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 mr-2"
        >
          ← Back
        </button>
        <p>Enter password for {email}</p>
      </div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
      >
        Log in
      </button>
    </form>
  );

  const renderSignUpStep = () => (
    <form onSubmit={handleSignUp}>
      <div className="mb-4 flex items-center">
        <button
          type="button"
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 mr-2"
        >
          ← Back
        </button>
        <p>Create account for {email}</p>
      </div>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
      >
        Sign Up
      </button>
    </form>
  );

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
          <h2 className="text-xl font-semibold">Log in or sign up</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-4xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Log in or sign up to complete your booking
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {step === "email" && renderEmailStep()}
        {step === "password" && renderPasswordStep()}
        {step === "signup" && renderSignUpStep()}
      </div>
    </div>
  );
};

export default LoginModal;
