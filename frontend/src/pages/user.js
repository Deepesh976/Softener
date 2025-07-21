import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({
    user: '',
    phoneNo: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/all');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  fetchUser();
}, [reload]); // It will refetch when reload changes


  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/all');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setMessage('❌ Failed to fetch user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/user/delete/${id}`);
      if (res.status === 200) {
        alert('User deleted successfully');
        fetchUser();
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ Network error while deleting user');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      user,
      phoneNo,
      location,
      password,
      confirmPassword,
    } = formData;

    // Trimmed values
    const trimmedUser = user.trim();
    const trimmedPhone = phoneNo.trim();
    const trimmedLocation = location.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Validation
    if (
      !trimmedUser ||
      !trimmedPhone ||
      !trimmedLocation ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      setMessage('❌ All fields are required');
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/user/register', {
        user: trimmedUser,
        phoneNo: trimmedPhone,
        location: trimmedLocation,
        password: trimmedPassword,
        confirmPassword: trimmedConfirmPassword,
      });

      setMessage(`✅ ${res.data.message}`);
      setFormData({
        user: '',
        phoneNo: '',
        location: '',
        password: '',
        confirmPassword: '',
      });
      fetchUser();
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Failed to register user');
    }
  };

  const cellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
  };

  return (
    <div style={{ padding: '1px 20px 30px', fontFamily: 'Poppins, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '2rem', color: '#003366', marginBottom: '1rem', textAlign: 'center' }}>
        User Registration
      </h2>

      {/* Form */}
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
        {[{ label: 'User', name: 'user', type: 'text' },
          { label: 'Phone No', name: 'phoneNo', type: 'text' },
          { label: 'Location', name: 'location', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
        ].map((field, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '6px', fontWeight: '500' }}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter ${field.label}`}
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
            }}
          >
            Submit
          </button>
        </div>
      </form>

      {/* Message */}
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

      {/* Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={cellStyle}>User</th>
              <th style={cellStyle}>Phone No</th>
              <th style={cellStyle}>Location</th>
              <th style={cellStyle}>Registered On</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.length === 0 ? (
              <tr>
                <td style={cellStyle} colSpan="5">No user found</td>
              </tr>
            ) : (
              user.map((user) => (
                <tr key={user._id}>
                  <td style={cellStyle}>{user.user}</td>
                  <td style={cellStyle}>{user.phoneNo}</td>
                  <td style={cellStyle}>{user.location}</td>
                  <td style={cellStyle}>
                    {new Date(user.registeredAt || user.createdAt).toLocaleString()}
                  </td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => navigate(`/edituser?id=${user._id}`)}
                      style={{
                        marginRight: '8px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
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

export default User;
