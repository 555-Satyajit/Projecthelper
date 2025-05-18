import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Pricing from '../components/Pricing';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Pricing />
      <CTA />
     <Footer />
    </>
  );
}