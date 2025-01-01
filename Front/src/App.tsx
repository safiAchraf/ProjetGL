/* Hooks */
import useAuth from "./hooks/useAuth";

/* Custom Components */
import Header from "./pages/home/header";
import Services from "./pages/home/services";
import Creations from "./pages/home/creations";
import PlanVisit from "./pages/home/plan";
import Footer from "./pages/home/footer";

/* Icons */
import { Loader2 } from "lucide-react";

/* Styles */
import "aos/dist/aos.css";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin" size={64} />
        <span>Moving at speed of light. Hold tight!</span>
      </main>
    );
  }

  return (
    <main className="font-poppins font-extralight">
      <Header />
      <Services />
      <Creations />
      <PlanVisit />
      <Footer />
    </main>
  );
}

export default App;
