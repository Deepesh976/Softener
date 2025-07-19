import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [user, setUser] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    axios
      .get('http://localhost:5000/api/devices/registered')
      .then((res) => setDevices(res.data))
      .catch((err) => console.error('Error fetching device data:', err));
  };

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/devices/registered/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Device deleted successfully');
      // Optionally refresh list or remove the item from state
      window.location.reload(); // OR filter from local state
    } else {
      const data = await response.json();
      alert(`Failed to delete: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Delete failed due to a network error');
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deviceId || !user || !phoneNo || !password || !confirmPassword) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
const res = await axios.post('http://localhost:5000/api/devices/registered', {
  deviceId,
  user,
  phoneNo: phoneNo,
  password,
  confirmPassword,
});
      setMessage(`✅ ${res.data.message}`);
      setDeviceId('');
      setUser('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      fetchDevices();
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Failed to add device');
    }
  };

  const permanentlyDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this device?')) {
      try {
        await axios.delete(`http://localhost:5000/api/devices/registered/${id}`);
        setMessage('✅ Device permanently deleted');
        fetchDevices();
      } catch (error) {
        console.error('Error deleting device:', error);
        setMessage('❌ Failed to delete device');
      }
    }
  };

  const cellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
  };

  return (
  <div
    style={{
      padding: '80px 20px 30px',
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      boxSizing: 'border-box',
    }}
  >
    <h2
      style={{
        fontSize: '2rem',
        color: '#003366',
        marginBottom: '1rem',
        textAlign: 'center',
      }}
    >
      Device Registration
    </h2>

    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 8px rgba(0,0,0,0.05)',
        marginBottom: '1.5rem',
      }}
    >
      {[
        { label: 'Device ID', value: deviceId, setter: setDeviceId, type: 'text', placeholder: 'Enter Device ID' },
        { label: 'User', value: user, setter: setUser, type: 'text', placeholder: 'Enter User Name' },
        { label: 'Phone No', value: phoneNo, setter: setPhone, type: 'number', placeholder: 'Enter Phone No' },
        { label: 'Password', value: password, setter: setPassword, type: 'password', placeholder: 'Enter Password' },
        { label: 'Confirm Password', value: confirmPassword, setter: setConfirmPassword, type: 'password', placeholder: 'Confirm Password' },
      ].map((field, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '6px', fontWeight: '500' }}>{field.label}</label>
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => field.setter(e.target.value)}
            placeholder={field.placeholder}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
        </div>
      ))}

      <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '10px' }}>
        <button
          type="submit"
          style={{
            padding: '10px 24px',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
        >
          Submit
        </button>
      </div>
    </form>

    {message && (
      <div
        style={{
          marginBottom: '1rem',
          fontWeight: '600',
          color: message.includes('✅') ? 'green' : 'red',
          backgroundColor: '#fff',
          padding: '10px 15px',
          borderRadius: '6px',
          boxShadow: '0 0 6px rgba(0,0,0,0.05)',
        }}
      >
        {message}
      </div>
    )}

    <div
      style={{
        overflowX: 'auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 8px rgba(0,0,0,0.05)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '600px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={cellStyle}>Device ID</th>
            <th style={cellStyle}>User</th>
            <th style={cellStyle}>Phone No</th>
            <th style={cellStyle}>Registered On</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.length === 0 ? (
            <tr>
              <td style={cellStyle} colSpan="5">
                No data available
              </td>
            </tr>
          ) : (
            devices.map((device) => (
              <tr key={device._id}>
                <td style={cellStyle}>{device.deviceId}</td>
                <td style={cellStyle}>{device.user}</td>
                <td style={cellStyle}>{device.phoneNo || 'N/A'}</td>
                <td style={cellStyle}>
                  {new Date(device.registeredAt || device.createdAt).toLocaleString('en-US')}
                </td>
                <td style={cellStyle}>
                  <button
                    onClick={() => navigate(`/editdevices?id=${device._id}`)}
                    style={{
                      marginRight: '8px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(device._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default Devices;
