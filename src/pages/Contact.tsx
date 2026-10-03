import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Instagram, Check } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface ContactPageProps {
  onBookClick: () => void;
}

export default function Contact({ onBookClick }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { contactApi } = await import('../services/api');
    const res = await contactApi.create({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    if (res.success) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="py-16 lg:py-24 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-light-gold font-sans font-medium mb-4">
              Get in Touch
            </p>
            <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-espresso mb-4">
              Contact Mimiko Studio
            </h1>
            <p className="text-taupe max-w-xl mx-auto">
              Jewellery • Ornaments • Embroidery • Custom Designs
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="heading-serif text-3xl font-semibold text-espresso mb-6">
                  We'd Love to Hear From You
                </h2>
                <p className="text-taupe leading-relaxed mb-8">
                  Whether you have a question about our collections, want to discuss a custom design, or need help with a booking — we're here to help.
                </p>

                <div className="space-y-6 mb-10">
                  <a href="mailto:hello@mimikostudio.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-champagne rounded-full group-hover:border-light-gold transition-colors">
                      <Mail size={18} className="text-muted-gold" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-taupe font-sans">Email</p>
                      <p className="text-espresso group-hover:text-muted-gold transition-colors">hello@mimikostudio.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-champagne rounded-full group-hover:border-light-gold transition-colors">
                      <MessageCircle size={18} className="text-muted-gold" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-taupe font-sans">WhatsApp</p>
                      <p className="text-espresso group-hover:text-muted-gold transition-colors">Message us on WhatsApp</p>
                    </div>
                  </a>

                  <a href="https://instagram.com/mimikostudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center border border-champagne rounded-full group-hover:border-light-gold transition-colors">
                      <Instagram size={18} className="text-muted-gold" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-taupe font-sans">Instagram</p>
                      <p className="text-espresso group-hover:text-muted-gold transition-colors">@mimikostudio</p>
                    </div>
                  </a>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={onBookClick}
                    className="inline-flex items-center gap-2 bg-espresso text-ivory px-6 py-3 text-sm font-sans font-medium hover:bg-espresso/90 transition-colors"
                  >
                    Book a Design
                  </button>
                  <a
                    href="mailto:hello@mimikostudio.com?subject=Enquiry"
                    className="inline-flex items-center gap-2 border border-espresso text-espresso px-6 py-3 text-sm font-sans font-medium hover:bg-espresso hover:text-ivory transition-colors"
                  >
                    Send an Enquiry
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              {submitted ? (
                <div className="bg-cream/50 p-8 lg:p-12 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-muted-gold" />
                  </div>
                  <h3 className="heading-serif text-2xl font-semibold text-espresso mb-3">
                    Message Sent
                  </h3>
                  <p className="text-taupe text-sm">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <div className="bg-cream/50 p-6 sm:p-8 lg:p-10">
                  <h3 className="heading-serif text-xl font-semibold text-espresso mb-6">
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-espresso text-ivory py-3 text-sm font-sans font-medium hover:bg-espresso/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Studio Image */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="aspect-[21/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1400&q=80"
                alt="Mimiko Studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
