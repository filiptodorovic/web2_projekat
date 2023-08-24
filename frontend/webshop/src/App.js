import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPageButtons from './components/LandingPageButtons';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SellerVerificationPage from './pages/SellerVerificationPage';
import CustomNavbar from './components/CustomNavbar';
import ManageProductsPage from './pages/ManageProductsPage';
import NewOrdersPage from './pages/NewOrdersPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AllOrdersPage from './pages/AllOrdersPage';
import PreviousOrdersPage from './pages/PreviousOrdersPage';
import ProductsPage from './pages/ProductsPage';
import jwtDecode from 'jwt-decode';

function App() {
  const [userRole, setUserRole] = useState(null); // Initialize state using useState
  const [verificationStatus, setVerificationStatus] = useState(null); // Initialize state using useState

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setVerificationStatus(decodedToken.VerificationStatus);
      setUserRole(role);
      console.log(role);
      console.log(verificationStatus);
    }
  }, []); // Use useEffect to fetch data on component mount

  require('dotenv').config()
  return (
    <Router>
      <CustomNavbar userRole={userRole} verificationStatus={verificationStatus}/>
      <Routes>
        <Route path="/" element={<LandingPageButtons />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/seller-verification" element={<SellerVerificationPage />} />
        <Route path="/manage-products" element={<ManageProductsPage />} />
        <Route path="/new-orders" element={<NewOrdersPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/all-orders" element={<AllOrdersPage />} />
        <Route path="/previous-orders" element={<PreviousOrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;