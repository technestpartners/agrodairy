import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Rfq from './pages/Rfq';
import Traceability from './pages/Traceability';
import Certifications from './pages/Certifications';
import ContainerCalculator from './pages/ContainerCalculator';
import LandedCostCalculator from './pages/LandedCostCalculator';
import CropCalendar from './pages/CropCalendar';
import HsCodeFinder from './pages/HsCodeFinder';
import Logistics from './pages/Logistics';
import Markets from './pages/Markets';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Admin CRM routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Public Pages */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/products/:slug" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/categories/:slug" element={<Layout><Products /></Layout>} />
      <Route path="/rfq" element={<Layout><Rfq /></Layout>} />
      
      {/* Quality & Traceability */}
      <Route path="/quality" element={<Layout><Certifications /></Layout>} />
      <Route path="/quality/certifications" element={<Layout><Certifications /></Layout>} />
      <Route path="/quality/traceability" element={<Layout><Traceability /></Layout>} />

      {/* Export Tools */}
      <Route path="/tools" element={<Layout><ContainerCalculator /></Layout>} />
      <Route path="/tools/container-calculator" element={<Layout><ContainerCalculator /></Layout>} />
      <Route path="/tools/landed-cost-calculator" element={<Layout><LandedCostCalculator /></Layout>} />
      <Route path="/tools/crop-calendar" element={<Layout><CropCalendar /></Layout>} />
      <Route path="/tools/hs-code-finder" element={<Layout><HsCodeFinder /></Layout>} />

      {/* Logistics & Markets */}
      <Route path="/logistics" element={<Layout><Logistics /></Layout>} />
      <Route path="/markets" element={<Layout><Markets /></Layout>} />

      {/* Company & Content */}
      <Route path="/company/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
      <Route path="/blogs/:slug" element={<Layout><BlogDetail /></Layout>} />

      {/* Catch-all 404 */}
      <Route path="*" element={<Layout><Home /></Layout>} />
    </Routes>
  );
}
