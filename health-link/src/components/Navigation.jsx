import Nav from "react-bootstrap/Nav";
import "/src/assets/style.css";
import logo from "/src/assets/Healthlink-logo.svg";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation-bar">
      <img src={logo} alt="healthlink-logo" />
      <Nav className="nav-links">
        {/* Each NavLink should be in its own Nav.Item */}
        <Nav.Item>
          <NavLink
            to="/dashboard" // Changed from href to to
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <img
              src="/src/assets/home-icon.svg"
              alt="Dashboard"
              className="nav-icon"
            />
            Dashboard
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/medicard" // Changed from href to to
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <img
              src="/src/assets/person-icon.svg"
              alt="medicard-icon"
              className="nav-icon"
            />
            MediCard
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/clinics" // Changed from href to to
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <img
              src="/src/assets/clinic-icon.svg"
              alt="clinic-icon"
              className="nav-icon"
            />
            Clinics
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/blog" // Changed from href to to
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <img
              src="/src/assets/book-icon.svg"
              alt="book-icon"
              className="nav-icon"
            />
            Blog
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/settings" // Changed from href to to
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <img
              src="/src/assets/settings-icon.svg"
              alt="settings-icon"
              className="nav-icon"
            />
            Settings
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Navigation;
