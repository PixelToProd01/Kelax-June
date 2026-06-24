import React from "react";
import Home from "./pages/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AboutUs from "./pages/Static/AboutUs.jsx";
import ContactUs from "./pages/Static/ContactUs.jsx";
import Disclaimer from "./pages/Static/Disclaimer.jsx";
import MakeInIndia from "./pages/Static/MakeInIndia.jsx";
import PrivacyPolicy from "./pages/Static/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/Static/TermsAndConditions.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ReturnRefundCancellation from "./pages/Static/ReturnRefundCancellation.jsx";
import Sitemap from "./pages/Static/Sitemap.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Solutions from "./pages/Solutions/Solutions.jsx";
import EducationAcademic from "./pages/Solutions/IndustryBased/EducationAcademic.jsx";
import FinancialServices from "./pages/Solutions/IndustryBased/FinancialServices.jsx";
import GovernmentPublicSector from "./pages/Solutions/IndustryBased/GovernmentPublicSector.jsx";
import MediaEntertainment from "./pages/Solutions/IndustryBased/MediaEntertainment.jsx";
import SecuritySurveillance from "./pages/Solutions/IndustryBased/SecuritySurveillance.jsx";
import HPC from "./pages/Solutions/ApplicationBased/HPC.jsx";
import BackupRestore from "./pages/Solutions/ApplicationBased/BackupRestore.jsx";
import Database from "./pages/Solutions/ApplicationBased/Database.jsx";
import Virtualization from "./pages/Solutions/ApplicationBased/Virtualization.jsx";
import VDI from "./pages/Solutions/ApplicationBased/VDI.jsx";
import CloudIntegrated from "./pages/Solutions/ApplicationBased/CloudIntegrated.jsx";
import AiCompute from "./pages/Solutions/CaseStudies/AiCompute.jsx";
import TechnologyPartners from "./pages/Partners/TechnologyPartners.jsx";
import ChannelPartners from "./pages/Partners/ChannelPartners.jsx";
import PartnerDashboard from "./pages/Users/Partner/PartnerDashboard.jsx";
import CustomerDashboard from "./pages/Users/Customer/CustomerDashboard.jsx";
import { useSelector } from "react-redux";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminLayout from "./layouts/Admin/AdminLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.jsx";
// import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import useAdminAuth from "./hooks/useAdminAuth.js";
import useUserAuth from "./hooks/useUserAuth.js";
import UserProtectedRoute from "./routes/UserProtectedRoute.jsx";
import PartnerLayout from "./layouts/User/Partner/PartnerLayout.jsx";
import CustomerLayout from "./layouts/User/Customer/CustomerLayout.jsx";
import AdminProfile from "./pages/Admin/Profile/AdminProfile.jsx";
import AdminPartners from "./pages/Admin/Partners/AdminPartners.jsx";
import AdminCustomers from "./pages/Admin/Customers/AdminCustomers.jsx";
import PartnerProfile from "./pages/Users/Partner/PartnerProfile.jsx";
import PartnerCertificates from "./pages/Users/Partner/PartnerCertificates.jsx";
import ProductList from "./pages/Products/ProductList.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import CreateProducts from "./pages/Admin/Products/CreateProducts.jsx";
import ViewProducts from "./pages/Admin/Products/ViewProducts.jsx";
import WarrantyCheck from "./pages/Support/WarrantyCheck.jsx";
import AddWarranty from "./pages/Admin/Products/AddWarranty.jsx";
import ViewWarranty from "./pages/Admin/Products/ViewWarranty.jsx";
import WarrantyCallLog from "./pages/Support/WarrantyCallLog.jsx";
import Company from "./pages/Static/Company.jsx";
import Resources from "./pages/Static/Resources.jsx";
// import AdminProfile from "./layouts/Admin/Profile/AdminProfile.jsx";

export const serverUrl = "http://localhost:8000";  // Work

// export const serverUrl = "http://192.168.1.162:8000";  // Work 

// export const serverUrl = window.location.hostname === "localhost" ? "http://localhost:8000" : "http://192.168.1.162:8000";   // Its Not Working

// export const serverUrl = "http://192.168.1.162:8000" |  "http://localhost:8000";  // Its Not Working


// export const serverUrl = "https://api-kelax.onrender.com";

const App = () => {
  useAdminAuth();
  useUserAuth();
  const { adminData } = useSelector((state) => state.admin);
  const { userData } = useSelector((state) => state.user);

//   useEffect(() => {
//   console.log("UserData updated in app.jsx:", userData);
// }, [userData]);

  return (
    <>
      <ScrollToTop />
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        {/* User Routes -> For Partner and Customer  */}
        <Route
          path="/register"
          element={!userData ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />
        {/* User Private Routes -> For Partner and Customer - Protected Routes  */}
        {/* Partner + Customer Dashboard -- > it is Wrong Way*/}
        {/* // Partner + Customer Dashboard */}
        <Route element={<UserProtectedRoute allowedRoles={["partner"]} />}>
          <Route path="/partner" element={<PartnerLayout />}>
            <Route index element={<PartnerDashboard />} />
            <Route path="dashboard" element={<PartnerDashboard />} />
            <Route path="profile" element={<PartnerProfile />} />
            <Route path="certificate" element={<PartnerCertificates />} />
            {/* <Route path="create-product" element={<CreateProduct />} /> */}
          </Route>
        </Route>
        <Route element={<UserProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="dashboard" element={<CustomerDashboard />} />
            {/* <Route path="create-product" element={<CreateProduct />} /> */}
          </Route>
        </Route>
        {/* <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
        </Route> */}
        {/* Static Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/company" element={<Company />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/make-in-india" element={<MakeInIndia />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route
          path="/return-refund-cancellation"
          element={<ReturnRefundCancellation />}
        />
        <Route path="/sitemap" element={<Sitemap />} />
        {/* Solution Pages - Industry Based */}
        <Route path="solutions" element={<Solutions />} />
        {/* Solution Pages - Industry Based */}{" "}
        {/* solutions/industry/media-entertainment */}
        <Route
          path="solutions/industry/media-entertainment"
          element={<MediaEntertainment />}
        />
        <Route
          path="solutions/industry/security-surveillance"
          element={<SecuritySurveillance />}
        />
        <Route
          path="solutions/industry/government-public-sector"
          element={<GovernmentPublicSector />}
        />
        <Route
          path="solutions/industry/education-academic"
          element={<EducationAcademic />}
        />
        <Route
          path="solutions/industry/financial-services"
          element={<FinancialServices />}
        />
        {/* Solution Pages - Application Based */}
        <Route
          path="solutions/application/high-performance-computing"
          element={<HPC />}
        />
        <Route
          path="solutions/application/backup-restore"
          element={<BackupRestore />}
        />
        <Route path="solutions/application/database" element={<Database />} />
        <Route
          path="solutions/application/virtualization"
          element={<Virtualization />}
        />
        <Route
          path="solutions/application/virtual-desktop-infrastructure"
          element={<VDI />}
        />
        <Route
          path="solutions/application/cloud-integrated"
          element={<CloudIntegrated />}
        />
        {/* Solution Pages - Case Studies */}
        <Route path="solutions/case-study/ai-compute" element={<AiCompute />} />
        {/* Partners */}
        <Route path="partners/technology" element={<TechnologyPartners />} />
        <Route path="partners/channel" element={<ChannelPartners />} />
        {/* Private Route */}

        {/* Warranty Call Log Page */}
        <Route path="support/warranty-call-log" element={<WarrantyCallLog />} />

        {/* Warranty Check */}
        <Route path="support/warranty-check" element={<WarrantyCheck />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/products/servers" element={<Servers />} />
        <Route path="/products/workstation" element={<Workstation />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/support" element={<Support />} />
        <Route path="/register" element={<Register />} /> */}
        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
        {/* Admin Login (NO layout) Routes */}
        <Route
          path="/admin/login"
          element={!adminData ? <AdminLogin /> : <Navigate to="/" />}
        />
        {/* <Route path="admin/dashboard" element={<AdminLayout /> }/> */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="profile" element={<AdminProfile />} />
            <Route path="create-product" element={<CreateProducts />}/>
            <Route path="view-product" element={<ViewProducts />}/>
            <Route path="add-warranty" element={<AddWarranty />}/>
            <Route path="view-warranty" element={<ViewWarranty />}/>
            <Route path="partners" element={<AdminPartners />} />
            <Route path="customers" element={<AdminCustomers />} />
            {/* <Route path="create-product" element={<CreateProduct />} /> */}
          </Route>
        </Route>

        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
        </Route> */}
        {/* Admin Layout After Login */}
        {/* <Route element={<AdminProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="create-product" element={<CreateProduct />} />
          </Route>
        </Route> */}
        {/* <Route path="/admin/dashboard" element={<AdminLayout />} /> */}
        {/* <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="partners" element={<ViewPartners />} />
          <Route path="customers" element={<ViewCustomers />} />
        </Route> */}
        {/* {AdminRoutes} */}

        {/* Product Page Routing */}
        <Route path="/products/:category" element={<ProductList />}/>
        <Route path="/products/details/:slug" element={<ProductDetails />}/>
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;