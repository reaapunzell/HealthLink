import Nav from "react-bootstrap/Nav";
import "/src/assets/style.css";
import logo from "/src/assets/Healthlink-logo.svg";
import { NavLink } from "react-router-dom";
import homeIcon from "/src/assets/home-icon.svg";
import personIcon from "/src/assets/person-icon.svg";
import clinicIcon from "/src/assets/clinic-icon.svg";
import bookIcon from "/src/assets/book-icon.svg";
import settingsIcon from "/src/assets/settings-icon.svg";

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
              src= {homeIcon}
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
              src={personIcon}
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
              src={clinicIcon}
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
              src={bookIcon}
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
              src={settingsIcon}
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
