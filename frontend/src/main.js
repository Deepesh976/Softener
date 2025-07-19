import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Navbar from './components/Navbar/navbar';
import Devices from './pages/devices';
import user from './pages/user';
import DeviceRegenHistory from './pages/deviceRegenHistory';
import DeviceAnalysis from './pages/deviceAnalysis';
import EditDevices from './pages/editdevices';
import Edituser from './pages/edituser';

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/devices"
          element={
            <>
              <Navbar />
              <Devices />
            </>
          }
        />
        <Route
          path="/deviceRegenHistory"
          element={
            <>
              <Navbar />
              <DeviceRegenHistory />
            </>
          }
        />
        <Route
          path="/deviceAnalysis"
          element={
            <>
              <Navbar />
              <DeviceAnalysis />
            </>
          }
        />
        <Route
          path="/editdevices"
          element={
            <>
              <Navbar />
              <EditDevices />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <Navbar />
              <user />
            </>
          }
        />
        <Route
          path="/edituser"
          element={
            <>
              <Navbar />
              <Edituser />
            </>
          }
        />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
