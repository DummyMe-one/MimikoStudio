import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { enquiriesApi } from '../services/electronicsApi';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillProduct?: {
    id: string;
    name: string;
    sku?: string;
  };
}

export default function EnquiryModal({ isOpen, onClose, prefillProduct }: EnquiryModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    quantity: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) {
      setError('Please fill in all required fields.');
      return;
    }

    const res = await enquiriesApi.create({
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      productId: prefillProduct?.id,
      enquiryType: prefillProduct ? 'PRODUCT' : 'GENERAL',
      message: formData.message,
      quantity: parseInt(formData.quantity) || 1,
    });

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || 'Failed to submit enquiry. Please try again.');
    }
  };

  const handleClose = () => {
    setStep(1);
    setSubmitted(false);
    setError('');
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      message: '',
      quantity: '1',
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-surface w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-3">
                    Thank You!
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Your enquiry has been received. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                      Product Enquiry
                    </p>
                    <h3 className="text-2xl font-bold text-text">
                      {prefillProduct ? `Enquire: ${prefillProduct.name}` : 'General Enquiry'}
                    </h3>
                    {prefillProduct?.sku && (
                      <p className="text-sm text-text-secondary mt-1">
                        SKU: {prefillProduct.sku}
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="bg-danger/10 border border-danger/30 text-danger text-sm p-3 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="w-full border border-border bg-surface px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        className="w-full border border-border bg-surface px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        className="w-full border border-border bg-surface px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full border border-border bg-surface px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any specific requirements or questions..."
                        className="w-full border border-border bg-surface px-4 py-3 text-text rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      Submit Enquiry
                    </button>
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
