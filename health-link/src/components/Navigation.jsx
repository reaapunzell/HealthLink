import Nav from "react-bootstrap/Nav";
import "/src/assets/style.css";
import logo from "/src/assets/Healthlink-logo.svg"

function Navigation () {
    return (
        <div className="navigation-bar">
            <img src={logo} />
            <h3>Health Link </h3>
            <Nav defaultActiveKey="/dashboard" className="nav-links">
            <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link href="/medicard">MediCard</Nav.Link>
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            <Nav.Link href="/clinics">Clinics</Nav.Link>
            <Nav.Link href="/education">Education</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
        </div>
    );
};

export default Navigation;