/* Custom Components */
import Header from "./components/home/header";
import Services from "./components/home/services";
import Creations from "./components/home/creations";
import PlanVisit from "./components/home/plan";
import Footer from "./components/home/footer";

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
