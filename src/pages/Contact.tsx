import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { enquiriesApi } from '../services/electronicsApi';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await enquiriesApi.create({
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      enquiryType: 'GENERAL',
      message: `${formData.subject}\n\n${formData.message}`,
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4">Contact Us</h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Visit our showroom or get in touch. We're here to help you find the perfect electronics for your needs.
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
                <h2 className="text-3xl font-bold text-text mb-6">Get in Touch</h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Whether you have a question about our products, need help with a purchase, or want to visit our showroom — we're here to help.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-border rounded-lg bg-background">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">Address</p>
                      <p className="text-text">Main Market, Your City, State - 123456</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-border rounded-lg bg-background">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">Phone</p>
                      <a href="tel:+919876543210" className="text-text hover:text-primary transition-colors">+91 98765 43210</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-border rounded-lg bg-background">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">Email</p>
                      <a href="mailto:info@shivamelectronics.com" className="text-text hover:text-primary transition-colors">info@shivamelectronics.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-border rounded-lg bg-background">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">Hours</p>
                      <p className="text-text">Mon-Sat: 10:00 AM - 9:00 PM</p>
                      <p className="text-text-secondary text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-success text-white px-6 py-3 rounded-lg font-semibold hover:bg-success/90 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              {submitted ? (
                <div className="bg-surface p-8 lg:p-12 text-center rounded-xl border border-border">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-3">Message Sent!</h3>
                  <p className="text-text-secondary">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="bg-surface p-6 sm:p-8 lg:p-10 rounded-xl border border-border">
                  <h3 className="text-2xl font-bold text-text mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-border bg-background px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-border bg-background px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full border border-border bg-background px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-border bg-background px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full border border-border bg-background px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
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
    </div>
  );
}
