import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import Medical from "./pages/Medical";
import BookAppointment from "./components/BookAppointment";
import Dashboard from "./pages/Dashboard";
import Map from "./components/Map";
import Clinics from "./pages/Clinics";
import Blog from "./pages/Blog";
import BasicDateCalendar from "./components/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/medicard" element={<Medical />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/calendar" element={<BasicDateCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
