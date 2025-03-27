import Nav from "react-bootstrap/Nav";
import "/src/assets/style.css";
import logo from "/src/assets/Healthlink-logo.svg";

function Navigation() {
  return (
    <div className="navigation-bar">
      <img src={logo} />
      <Nav defaultActiveKey="/dashboard" className="nav-links">
        <Nav.Link href="/dashboard">
          <img
            src="/src/assets/home-icon.svg"
            alt="Dashboard"
            className="nav-icon"
          />
          Dashboard
        </Nav.Link>
        <Nav.Link href="/medicard">
          <img
            src="/src/assets/person-icon.svg"
            alt="medicard-icon"
            className="nav-icon"
          />
          MediCard
        </Nav.Link>
        <Nav.Link href="/clinics">
          <img
            src="/src/assets/clinic-icon.svg"
            alt="clinic-icon"
            className="nav-icon"
          />
          Clinics
        </Nav.Link>
        <Nav.Link href="/blog">
          <img
            src="/src/assets/book-icon.svg"
            alt="book-icon"
            className="nav-icon"
          />
          Blog
        </Nav.Link>
        <Nav.Link href="/settings">
          <img
            src="/src/assets/settings-icon.svg"
            alt="settings-icon"
            className="nav-icon"
          />
          Settings
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Navigation;
