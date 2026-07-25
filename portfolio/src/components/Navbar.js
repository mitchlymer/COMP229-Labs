import { Link } from "react-router-dom";

function Navbar() {
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
            </div>
        </nav>
    );
}

export default Navbar;