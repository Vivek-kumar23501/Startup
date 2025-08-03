import React from 'react';
import { Routes, Route,  } from 'react-router-dom';
import GecNavbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import NoticeBoard from './components/NoticeBoard';
import Services from './components/Services';
import Login from './components/LoginPageUser';
import Loginin from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDashboard from './components/Userdashboard';
import InstituteDashboard from './components/InstituteDashboard'; 
import CreateEventForm from './components/Createevent';
import IdeaForm from './components/IdeaForm';
import ApplyFormPage from './components/ApplyFormPage';
import ViewStartupSubmissions from './components/ViewStartupSubmissions';
import AppliedCandidatesPage from './components/AppliedCandidatesPage';
import ActiveEventsPage from './components/ActiveEventsPage';
import MentorsDonePage from './components/MentorsDonePage';
import CreateNoticePage from './components/CreateNoticePage';
import DeleteNoticePage from './components/DeleteNoticePage';
import InstituteGalleryUpload from './components/InstituteGalleryUpload';
import GalleryPage from './components/GalleryPage';
import StartupShowcase from './components/StartupShowcase';
 // ✅ Import the Admin Dashboard

 // ✅ Import the Delete Notice Page
// ✅ Import the Ment
// ✅ Import the Applied Candidates Page
// ✅ Import the new IdeaForm component 
// <- import it if created

function App() {
  

  

  return (
    <>
     


      <Routes   >
        <Route path="/" element={<LandingPage />} />
        

        <Route path="/about" element={<AboutUs />} />
        <Route path="/notice" element={<NoticeBoard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login/user" element={<Login />} />
        <Route path="/login/admin" element={<Loginin />} />
        <Route path="/login/institute" element={<Loginin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/institute-dashboard" element={<InstituteDashboard />} />
        <Route path="/institute/create-event" element={<CreateEventForm />} />
        <Route path="/institute/applications" element={<AppliedCandidatesPage />} />
        <Route path="startup-bihar-showcase" element={<StartupShowcase />} />
         {/* ✅ route added */}
        
        {/* ✅ route added */}
        <Route path="/submit-idea" element={<IdeaForm />} />
        <Route path="/view-startup-ideas" element={<ViewStartupSubmissions />} />
        <Route path="/apply/:eventId" element={<ApplyFormPage />} />
         {/* ✅ route added */}
        
        {/* ✅ route added */}
        <Route path="/events" element={<ActiveEventsPage />} />
<Route path="/mentors" element={<MentorsDonePage />} />
<Route path="/institute/create-notice" element={<CreateNoticePage />} />
<Route path="/institute/delete-notice" element={<DeleteNoticePage />} />
<Route path="/institute/gallery" element={<InstituteGalleryUpload />} />
<Route path="/gallery" element={<GalleryPage />} />
 {/* ✅ Admin Dashboard route */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
