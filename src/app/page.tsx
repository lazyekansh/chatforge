import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Platforms from '@/components/landing/Platforms';
import Templates from '@/components/landing/Templates';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Platforms />
      <Templates />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
