import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import FeaturesSection from "./pages/Features";
import ContactForm from "./pages/ContactUs";
import Register from "./forms/Register";
import UserDashboard from "./page_users/UserDashboard";
import UserProfile from "./page_users/UserProfile";
import AdminAnalytics from "./pages_admin/AdminTaskAnalytics";
import AdminDashBoard from "./pages_admin/AdminDashboard";
import AdminReports from "./pages_admin/AdminReports";
import AdminUsers from "./pages_admin/AdminUsers";
import AdminTasks from "./pages_admin/AdminTasks";
// import AdminUsers from "./pages_admin/AdminUsers";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // pages where you don't want Navbar/Footer
  const hideLayout = ["/user-dashboard"];

  return (
    <>
      <div className="mt-16 mb-16">{children}</div>
      {!hideLayout.includes(location.pathname) && <Footer />}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-profile" element={<UserProfile/>} />
          <Route path="/admin-dashboard/analytics" element={<AdminAnalytics />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/admin-dashboard/reports" element={<AdminReports/>}/>
          <Route path="/admin-dashboard/users" element={<AdminUsers/>}/>
          <Route path="/admin-dashboard/tasks" element={<AdminTasks/>}/>
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
