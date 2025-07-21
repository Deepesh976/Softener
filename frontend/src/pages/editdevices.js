import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDevices = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { device } = location.state || {};

  const [deviceData, setDeviceData] = useState({
    deviceId: '',
    user: '',
    phoneNo: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (device) {
      setDeviceData({
        deviceId: device.deviceId || '',
        user: device.user || '',
        phoneNo: device.phoneNo || '',
      });
    }
  }, [device]);

  const handleChange = (e) => {
    setDeviceData({
      ...deviceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!device || !device._id) {
      setMessage('❌ Device data is missing');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/devices/registered/${device._id}`, deviceData);
      setMessage('✅ Device updated successfully');
      setTimeout(() => navigate('/devices'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update device');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Edit Device</h2>
        {message && (
          <p style={{ ...styles.message, color: message.includes('✅') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
        <form onSubmit={handleUpdate} style={styles.form}>
          <input
            name="deviceId"
            value={deviceData.deviceId}
            onChange={handleChange}
            placeholder="Device ID"
            required
            style={styles.input}
          />
          <input
            name="user"
            value={deviceData.user}
            onChange={handleChange}
            placeholder="User"
            required
            style={styles.input}
          />
          <input
            name="phoneNo"
            value={deviceData.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Update Device
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '100px',
    paddingBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    background: '#f4f6f9',
    boxSizing: 'border-box',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  formWrapper: {
    background: '#fff',
    padding: '30px 25px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '450px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '22px',
    fontWeight: '600',
    color: '#003366',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  },
  button: {
    padding: '12px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  message: {
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

export default EditDevices;
