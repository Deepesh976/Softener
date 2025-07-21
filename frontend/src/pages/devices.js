import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Devices = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchDevices();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/all');
      setUsers(res.data);
    } catch (error) {
      alert('Error fetching users');
    }
  };

  const fetchDevices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/devices/all');
      setDevices(res.data);
    } catch (error) {
      alert('Error fetching devices');
    }
  };

  const handleUserChange = (e) => {
    const username = e.target.value;
    setSelectedUser(username);
    const matched = users.find((u) => u.user === username);
    setPhoneNo(matched ? matched.phoneNo : '');
  };

  const handleRegister = async () => {
    const trimmedDeviceId = deviceId.trim().toUpperCase();
    if (!trimmedDeviceId || !selectedUser || !phoneNo) {
      return alert('Please fill all fields');
    }

    try {
      await axios.post('http://localhost:5000/api/devices/registered', {
        deviceId: trimmedDeviceId,
        user: selectedUser,
        phoneNo,
      });

      alert('Device Registered Successfully');
      setDeviceId('');
      setSelectedUser('');
      setPhoneNo('');
      fetchDevices();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this device?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/devices/${id}`);
      fetchDevices();
      alert('Device deleted successfully');
    } catch (error) {
      alert('Error deleting device');
    }
  };

  const handleEdit = (device) => {
    navigate(`/editdevices`, { state: { device } });
  };

  const filteredDevices = devices.filter(
    (d) =>
      d.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phoneNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Register Device</h2>

        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="Search by user, phone or device ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.inlineForm}>
          <select
            value={selectedUser}
            onChange={handleUserChange}
            style={styles.input}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user.user}>
                {user.user}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            readOnly
            style={{ ...styles.input, backgroundColor: '#f5f5f5' }}
          />

          <input
            type="text"
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
            style={styles.input}
          />

          <button style={styles.button} onClick={handleRegister}>
            Register
          </button>
        </div>

        <div style={styles.tableWrapper}>
          <h3 style={styles.subHeading}>Registered Devices</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Device ID</th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Phone No</th>
                  <th style={styles.th}>Registered At</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={styles.emptyRow}>
                      No devices found
                    </td>
                  </tr>
                ) : (
                  filteredDevices.map((d) => (
                    <tr key={d._id}>
                      <td style={styles.td}>{d.deviceId}</td>
                      <td style={styles.td}>{d.user}</td>
                      <td style={styles.td}>{d.phoneNo}</td>
                      <td style={styles.td}>
                        {new Date(d.registeredAt).toLocaleString()}
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => handleEdit(d)}
                          style={{ ...styles.actionBtn, backgroundColor: '#ffc107' }}
                        >
                          Edit
                        </button>{' '}
                        <button
                          onClick={() => handleDelete(d._id)}
                          style={{ ...styles.actionBtn, backgroundColor: '#dc3545' }}
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
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '1px 20px 30px',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    color: '#003366',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  searchRow: {
    marginTop: '-3rem',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  searchInput: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '320px',
    backgroundColor: '#fff',
  },
  inlineForm: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    minWidth: '200px',
    flex: '1',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
    whiteSpace: 'nowrap',
  },
  actionBtn: {
    padding: '6px 12px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  tableWrapper: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '1.5rem',
  },
  subHeading: {
    fontSize: '1.4rem',
    color: '#333',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    backgroundColor: '#f0f0f0',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
  },
  emptyRow: {
    textAlign: 'center',
    padding: '1rem',
    color: '#999',
  },
};

export default Devices;
