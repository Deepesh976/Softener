import React, { useState, useEffect } from 'react';

const DeviceRegenHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available device IDs
  useEffect(() => {
    const fetchDevicesFromAnalysis = async () => {
      try {
        const res = await fetch('https://api.softener.site/softener/api/data/fetch/analysis/all');
        const data = await res.json();
        const ids = (data.response || []).map(item => item.id);
        setDeviceList(ids);
      } catch (error) {
        console.error('Error fetching device list from analysis API:', error);
      }
    };

    fetchDevicesFromAnalysis();
  }, []);

  // Fetch regeneration history based on selected device ID
  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedDeviceId) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.softener.site/softener/api/data/fetch/history?id=${selectedDeviceId}`
        );
        const data = await res.json();
        const sorted = (data.response || []).sort((a, b) =>
          new Date(b.startedAt) - new Date(a.startedAt)
        );
        setHistoryData(sorted);
      } catch (error) {
        console.error('Error fetching history data:', error);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [selectedDeviceId]);

  const styles = {
    container: {
      padding: '100px 30px 30px',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
    },
    topBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '30px',
      flexWrap: 'wrap',
    },
    heading: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
    },
    dropdown: {
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
      minWidth: '220px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 0 12px rgba(0, 0, 0, 0.06)',
    },
    th: {
      padding: '14px',
      backgroundColor: '#e9ecef',
      border: '1px solid #dee2e6',
      fontWeight: '600',
      textAlign: 'center',
      color: '#333',
    },
    td: {
      padding: '12px',
      border: '1px solid #dee2e6',
      textAlign: 'center',
      color: '#555',
    },
    noData: {
      textAlign: 'center',
      padding: '30px',
      color: '#999',
      fontSize: '16px',
    },
    loading: {
      textAlign: 'center',
      padding: '30px',
      fontSize: '18px',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <select
          style={styles.dropdown}
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          <option value="">Select Device</option>
          {deviceList.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <h2 style={styles.heading}>Device Regeneration History</h2>
      </div>

      {!selectedDeviceId ? (
        <div style={styles.noData}>Please select a device to view history</div>
      ) : loading ? (
        <div style={styles.loading}>Loading history...</div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Cycle</th>
              <th style={styles.th}>Started At</th>
              <th style={styles.th}>Ended At</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  No data available for selected device
                </td>
              </tr>
            ) : (
              historyData.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.cycle}</td>
                  <td style={styles.td}>{item.startedAt}</td>
                  <td style={styles.td}>{item.endedAt}</td>
                  <td style={styles.td}>{item.duration}</td>
                  <td style={styles.td}>{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeviceRegenHistory;
