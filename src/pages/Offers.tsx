import ScrollReveal from '../components/ScrollReveal';
import { Tag } from 'lucide-react';

export default function Offers() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-text mb-2">Special Offers</h1>
          <p className="text-text-secondary text-lg">Check out our latest deals and promotions</p>
        </div>

        {/* Empty State */}
        <ScrollReveal>
          <div className="bg-white rounded-xl p-12 border border-border text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tag size={40} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-text mb-3">No Active Offers</h2>
            <p className="text-text-secondary mb-6">
              There are no active offers at the moment. Check back soon for exciting deals!
            </p>
            <p className="text-sm text-text-secondary">
              Visit our showroom for exclusive in-store promotions and discounts.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
