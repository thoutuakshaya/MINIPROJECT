import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
// import './App.css';

// Public Pages
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import MyEvents from './pages/MyEvents.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import Contact from './pages/Contact.jsx';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import FAQ from './components/FAQ';
import LearnMore from './pages/LearnMore.jsx';
import AboutPage from './pages/Aboutpage.jsx';

// Admin Pages
import SidebarLayout from './components/AdminLeftbar.jsx';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageEvents from './pages/admin/ManageEvents.jsx';
import AdminMessages from './pages/admin/Messages.jsx';
import ManageExperts from './pages/admin/ManageExperts.jsx';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';
import ReviewsPage from "./pages/admin/ReviewsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import SettingsPage from "./pages/admin/SettingsPage";

// Organizer Pages
import OrganizerDashboard from './pages/OrganizerDashboard.jsx';
import ManageEvents from './pages/organizer/ManageEvents.jsx';
import BookVendors from './pages/organizer/BookExperts.jsx';
import OrganizerProfile from './pages/organizer/Profile';
import UploadMedia from './pages/organizer/UploadMedia.jsx';
import ShareEvent from './pages/organizer/ShareEvent.jsx';
import OrganizerBookings from './pages/organizer/OrganizerBookings.jsx';

// Expert Pages
import ExpertDashboard from './pages/expert/ExpertDashboard.jsx';
import ManageServices from './pages/expert/ManageServices.jsx';
import ExpertEarnings from './pages/expert/ExpertEarnings.jsx';
import ExpertReviews from './pages/expert/ExpertReviews.jsx';
import ExpertProfile from './pages/expert/ExpertProfile.jsx';

// Attendee Pages
import AttendeeDashboard from './pages/attendee/Dashboard.jsx';
import AttendeeMyEvents from './pages/attendee/MyEvents.jsx';
import ExploreEvents from './pages/attendee/EventDetail.jsx';
import CertificatesPage from './pages/attendee/CertificatesPage.jsx';
import ProfilePage from './pages/attendee/ProfilePage.jsx';


// Route Guards
import AdminRoute from './routes/AdminRoutes.jsx';
import ExpertRoute from './routes/ExpertRoute.jsx';
import OrganizerRoute from './routes/OrganizerRoute.jsx';

// Optional 404 Page
import NotFound from './pages/NotFound.jsx';
import ViewProfile from './pages/ViewProfile.jsx';
import Profile from './pages/organizer/Profile.jsx';
  


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/booking/:id" element={<BookingConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/experts" element={<AdminRoute><ManageExperts /></AdminRoute>} />
        <Route path="/admin/events" element={<AdminRoute><AdminManageEvents /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><SidebarLayout><AdminMessages /></SidebarLayout></AdminRoute>} />
        <Route path="/admin/reviews" element={<AdminRoute><ReviewsPage /></AdminRoute>} />
        <Route path="/admin/payments" element={<AdminRoute><PaymentsPage /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />

        {/* Organizer Routes */}
        <Route path="/organizer/dashboard" element={<OrganizerRoute><OrganizerDashboard /></OrganizerRoute>} />

        <Route path="/organizer/events" element={<OrganizerRoute><ManageEvents /></OrganizerRoute>} />
        <Route path="/organizer/experts/book" element={<OrganizerRoute><BookVendors /></OrganizerRoute>} />
        <Route path="/organizer/profile" element={<OrganizerRoute><OrganizerProfile /></OrganizerRoute>} />
        <Route path="/organizer/media" element={<OrganizerRoute><UploadMedia /></OrganizerRoute>} />
        <Route path="/organizer/share" element={<OrganizerRoute><ShareEvent /></OrganizerRoute>} />
        <Route path="/organizer/OrganizerBookings" element={<OrganizerRoute><OrganizerBookings /></OrganizerRoute>} />

        {/* Expert Routes */}
        <Route path="/expert/dashboard" element={<ExpertRoute><ExpertDashboard /></ExpertRoute>} />
        <Route path="/expert/services" element={<ExpertRoute><ManageServices /></ExpertRoute>} />
        <Route path="/expert/earnings" element={<ExpertRoute><ExpertEarnings /></ExpertRoute>} />
        <Route path="/expert/reviews" element={<ExpertRoute><ExpertReviews /></ExpertRoute>} />
        <Route path="/expert/profile" element={<ExpertRoute><ExpertProfile /></ExpertRoute>} />

        {/* Attendee Routes */}
        <Route path="/attendee/dashboard" element={<AttendeeDashboard />} />
        <Route path="/attendee/myevents" element={<AttendeeMyEvents />} />
        <Route path="/attendee/events" element={<ExploreEvents />} />
        <Route path="/attendee/certificates" element={<CertificatesPage />} />
        <Route path="/attendee/profile" element={<ProfilePage />} />


        {/* Fallback Route */}
        <Route path="/view-profile/:id" element={<ViewProfile />} />

        <Route path="*" element={<NotFound />} />
        
        


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
