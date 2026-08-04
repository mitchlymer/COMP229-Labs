import { Link, useLocation } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../api/api";

function Navbar() {
    const { pathname } = useLocation();
    const isSignedIn =
        Boolean(getAuthToken()) && pathname !== "/admin/login";

    const handleSignOut = () => {
        removeAuthToken();
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                ML
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About Me</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/services">Services</Link>
                <Link to="/references">References</Link>
                <Link to="/contact">Contact Me</Link>
                <Link to="/admin">Admin</Link>

                {isSignedIn && (
                    <Link to="/admin/login" onClick={handleSignOut}>
                        Sign Out
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;