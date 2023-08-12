import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPageButtons from './components/LandingPageButtons';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SellerVerificationPage from './pages/SellerVerificationPage';
import CustomNavbar from './components/CustomNavbar';
import ManageProductsPage from './pages/ManageProductsPage';

function App() {
  return (
    <Router>
      <CustomNavbar/>
      <Routes>
        <Route path="/" element={<LandingPageButtons />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller-verification" element={<SellerVerificationPage />} />
        <Route path="/manage-products" element={<ManageProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;