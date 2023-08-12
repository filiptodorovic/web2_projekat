import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPageButtons from './components/LandingPageButtons';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SellerVerification from './pages/SellerVerification';
import CustomNavbar from './components/CustomNavbar';

function App() {
  return (
    <Router>
      <CustomNavbar/>
      <Routes>
        <Route path="/" element={<LandingPageButtons />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller-verification" element={<SellerVerification />} />
      </Routes>
    </Router>
  );
}

export default App;