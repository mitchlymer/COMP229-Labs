import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import References from "./pages/References";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminReferences from "./pages/admin/AdminReferences";
import AdminUsers from "./pages/admin/AdminUsers";

import "./App.css";

function App() {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/references" element={<References />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/services"
                    element={
                        <ProtectedRoute>
                            <AdminServices />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/projects"
                    element={
                        <ProtectedRoute>
                            <AdminProjects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/references"
                    element={
                        <ProtectedRoute>
                            <AdminReferences />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <AdminUsers />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;