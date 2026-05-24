import Navbar from '@/components/landing/Navbar';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export const metadata = {
  title: 'Pricing — ChatForge',
  description: 'Simple, transparent pricing for ChatForge. Start free, upgrade when you need more power.',
};

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
