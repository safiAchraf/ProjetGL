/* Custom Components */
import Header from "./pages/home/header";
import Services from "./pages/home/services";
import Creations from "./pages/home/creations";
import PlanVisit from "./pages/home/plan";
import Footer from "./pages/home/footer";

/* Styles */
import "aos/dist/aos.css";

function App() {
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
