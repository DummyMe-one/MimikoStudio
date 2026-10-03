import { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillDesign?: {
    id: string;
    name: string;
    collection: string;
  };
}

export default function BookingModal({ isOpen, onClose, prefillDesign }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    occasion: '',
    requestedDate: '',
    quantity: '1',
    customization: 'no',
    colorPreference: '',
    sizeDetails: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    // Submit to Supabase
    const { bookingsApi } = await import('../services/api');
    const res = await bookingsApi.create({
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      designId: prefillDesign?.id,
      designName: prefillDesign?.name,
      collection: prefillDesign?.collection,
      occasion: formData.occasion,
      requestedDate: formData.requestedDate,
      quantity: formData.quantity,
      customization: formData.customization,
      colorPreference: formData.colorPreference,
      notes: formData.notes,
    });
    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || 'Failed to submit booking. Please try again.');
    }
  };

  const handleClose = () => {
    setStep(1);
    setSubmitted(false);
    setError('');
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      occasion: '',
      requestedDate: '',
      quantity: '1',
      customization: 'no',
      colorPreference: '',
      sizeDetails: '',
      notes: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-ivory w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-taupe hover:text-espresso transition-colors z-10"
              aria-label="Close booking form"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                /* Success State */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-muted-gold" />
                  </div>
                  <h3 className="heading-serif text-2xl font-semibold text-espresso mb-3">
                    Thank You
                  </h3>
                  <p className="text-taupe text-sm leading-relaxed mb-6">
                    Your booking request has been received. Someone from Mimiko Studio will contact you shortly to confirm availability and details.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-espresso text-ivory px-6 py-2.5 text-sm font-sans hover:bg-espresso/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-light-gold font-sans font-medium mb-2">
                      Booking Request
                    </p>
                    <h3 className="heading-serif text-2xl font-semibold text-espresso">
                      {prefillDesign ? `Book: ${prefillDesign.name}` : 'Book a Design'}
                    </h3>
                    {prefillDesign && (
                      <p className="text-sm text-taupe mt-1">
                        Collection: {prefillDesign.collection}
                      </p>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-6">
                    {[1, 2].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          s <= step ? 'bg-light-gold' : 'bg-champagne/40'
                        }`}
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 p-3 rounded">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Occasion
                          </label>
                          <input
                            type="text"
                            name="occasion"
                            value={formData.occasion}
                            onChange={handleChange}
                            placeholder="Wedding, Navratri, Party..."
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full bg-espresso text-ivory py-3 text-sm font-sans font-medium hover:bg-espresso/90 transition-colors mt-6"
                        >
                          Continue
                        </button>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            name="requestedDate"
                            value={formData.requestedDate}
                            onChange={handleChange}
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Customization Required?
                          </label>
                          <select
                            name="customization"
                            value={formData.customization}
                            onChange={handleChange}
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                          >
                            <option value="no">No, as shown</option>
                            <option value="color">Color change only</option>
                            <option value="size">Size modification</option>
                            <option value="full">Full customization</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Color Preference
                          </label>
                          <input
                            type="text"
                            name="colorPreference"
                            value={formData.colorPreference}
                            onChange={handleChange}
                            placeholder="e.g., Red and gold, Pastel pink..."
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-taupe font-sans mb-1.5">
                            Additional Notes
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Any specific requirements or questions..."
                            className="w-full border border-champagne bg-white px-4 py-2.5 text-sm text-espresso rounded-sm focus:border-light-gold focus:outline-none transition-colors resize-none"
                          />
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 border border-champagne text-espresso py-3 text-sm font-sans font-medium hover:bg-cream transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-espresso text-ivory py-3 text-sm font-sans font-medium hover:bg-espresso/90 transition-colors"
                          >
                            Submit Request
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
