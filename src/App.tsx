import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import DesignsManager from './pages/admin/DesignsManager';
import CollectionsManager from './pages/admin/CollectionsManager';
import BookingsManager from './pages/admin/BookingsManager';
import MessagesManager from './pages/admin/MessagesManager';
import SetupGuide from './pages/admin/SetupGuide';
import AppearanceStudio from './pages/admin/AppearanceStudio';
import HomepageBuilder from './pages/admin/HomepageBuilder';
import MediaLibrary from './pages/admin/MediaLibrary';
import DynamicHome from './pages/DynamicHome';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{ id: string; name: string; collection: string } | undefined>();

  const openBookingModal = (design?: { id: string; name: string; collection: string }) => {
    setBookingPrefill(design);
    setIsBookingModalOpen(true);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <HashRouter>
          <Routes>
        {/* Admin Routes (no Layout wrapper) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<SetupGuide />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="designs" element={<DesignsManager />} />
          <Route path="collections" element={<CollectionsManager />} />
          <Route path="bookings" element={<BookingsManager />} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="setup" element={<SetupGuide />} />
          <Route path="appearance" element={<AppearanceStudio />} />
          <Route path="homepage" element={<HomepageBuilder />} />
          <Route path="media" element={<MediaLibrary />} />
        </Route>

        {/* Public Routes */}
        <Route path="*" element={
          <Layout onBookClick={() => openBookingModal()}>
            <Routes>
              <Route path="/" element={<DynamicHome onBookClick={openBookingModal} />} />
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
        } />
      </Routes>
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            prefillDesign={bookingPrefill}
          />
        </HashRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
