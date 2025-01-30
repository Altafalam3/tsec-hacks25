import './App.css';
import Login from './Pages/Login/Login.js'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer.js'
import TrackAnimalMovements from "./Pages/TrackAnimalMovements/TrackAnimalMovements.jsx";
import WildfireDetection from "./Pages/WildfireDetection/WildfireDetection.jsx";
import InjuryDetection from "./Pages/InjuryDetection/InjuryDetection.jsx";
import RealTimeAlerts from "./Pages/RealTimeAlerts/RealTimeAlerts.jsx";
import LiveAlertMap from './Pages/LiveAlertMap/LiveAlertMap.jsx';
import Home from './Pages/Home/Home.jsx';
import ReportThreat from './Pages/Threat/ReportThreat.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <UserProvider>
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/track-animal-movements" element={<TrackAnimalMovements />} />
            <Route path="/wildfire-detection" element={<WildfireDetection />} />
            <Route path="/injury-detection" element={<InjuryDetection />} />
            <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
            <Route path="/live-alert-map" element={<LiveAlertMap />} />
            <Route path="/report-threat" element={<ReportThreat />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    </UserProvider>
  );
}

export default App;