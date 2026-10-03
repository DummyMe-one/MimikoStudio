import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BookingModal from './components/BookingModal';
import HomePage from './pages/Home';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import DesignDetail from './pages/DesignDetail';
import About from './pages/About';
import Embroidery from './pages/Embroidery';
import NavratriPage from './pages/Navratri';
import CustomDesign from './pages/CustomDesign';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import { Privacy, Terms } from './pages/StaticPages';
import NotFound from './pages/NotFound';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{ id: string; name: string; collection: string } | undefined>();

  const openBookingModal = (design?: { id: string; name: string; collection: string }) => {
    setBookingPrefill(design);
    setIsBookingModalOpen(true);
  };

  return (
    <BrowserRouter>
      <Layout onBookClick={() => openBookingModal()}>
        <Routes>
          <Route path="/" element={<HomePage onBookClick={openBookingModal} />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/designs/:slug" element={<DesignDetail onBookClick={openBookingModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/embroidery" element={<Embroidery />} />
          <Route path="/navratri" element={<NavratriPage onBookClick={openBookingModal} />} />
          <Route path="/custom-design" element={<CustomDesign />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact onBookClick={openBookingModal} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefillDesign={bookingPrefill}
      />
    </BrowserRouter>
  );
}
