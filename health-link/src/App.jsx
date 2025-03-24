import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import MediCard from "./components/MediCard";
import BookAppointment from "./components/BookAppointment";
import Dashboard from "./pages/Dashboard";
import Map from "./components/Map";
import Clinics from "./pages/Clinics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/medicard" element={<MediCard />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/clinics" element={<Clinics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
