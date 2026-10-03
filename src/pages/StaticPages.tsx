import ScrollReveal from '../components/ScrollReveal';

export function Privacy() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="heading-serif text-4xl sm:text-5xl font-semibold text-espresso mb-4">
              Privacy Policy
            </h1>
            <p className="text-taupe">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-sm max-w-none text-taupe space-y-6">
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Information We Collect</h2>
                <p className="leading-relaxed">
                  When you submit a booking request or contact form on our website, we collect the information you provide, including your name, email address, phone number, and any details related to your design request or enquiry.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">How We Use Your Information</h2>
                <p className="leading-relaxed">
                  We use the information you provide solely to respond to your enquiries, process booking requests, communicate about your orders, and provide customer support. We do not sell, trade, or share your personal information with third parties.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Data Security</h2>
                <p className="leading-relaxed">
                  We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Your Rights</h2>
                <p className="leading-relaxed">
                  You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at hello@mimikostudio.com.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Cookies</h2>
                <p className="leading-relaxed">
                  Our website may use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Contact</h2>
                <p className="leading-relaxed">
                  For any privacy-related questions, please contact us at hello@mimikostudio.com.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export function Terms() {
  return (
    <div>
      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="heading-serif text-4xl sm:text-5xl font-semibold text-espresso mb-4">
              Terms & Booking Policy
            </h1>
            <p className="text-taupe">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-sm max-w-none text-taupe space-y-6">
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Booking Process</h2>
                <p className="leading-relaxed">
                  All bookings submitted through our website are requests, not confirmed orders. A booking is confirmed only after we have reviewed your request, confirmed availability, and communicated with you directly.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Custom Designs</h2>
                <p className="leading-relaxed">
                  Custom design requests are reviewed on a case-by-case basis. Timelines, pricing, and feasibility will be discussed directly with you before any work begins. Custom-made pieces cannot be returned or exchanged.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Pricing</h2>
                <p className="leading-relaxed">
                  Prices shown on our website are indicative and may vary based on customization, material availability, and design complexity. Final pricing will be confirmed before your order is processed.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Delivery</h2>
                <p className="leading-relaxed">
                  Delivery timelines depend on the complexity of the design and current workload. We will provide an estimated timeline when your booking is confirmed. Ready-made pieces are typically shipped within 3-5 business days of confirmation.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Cancellations</h2>
                <p className="leading-relaxed">
                  Cancellation policies vary based on the stage of production. Please discuss cancellation terms with us before placing a custom order. Ready-made pieces may be cancelled before shipping.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Product Care</h2>
                <p className="leading-relaxed">
                  Each piece comes with specific care instructions. We recommend following these guidelines to maintain the beauty and longevity of your jewellery and ornaments. Damage due to improper care is not covered.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Intellectual Property</h2>
                <p className="leading-relaxed">
                  All designs, images, and content on this website are the property of Mimiko Studio. Reproduction or use without permission is not permitted.
                </p>
              </div>
              <div>
                <h2 className="heading-serif text-2xl font-semibold text-espresso mb-3">Contact</h2>
                <p className="leading-relaxed">
                  For questions about these terms, please contact us at hello@mimikostudio.com.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
