import Hero from "~/components/Hero";
import Footer from "~/components/Footer";

export default function Landing() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
