import React, { useState, useEffect } from 'react';

const DeviceRegenHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  // Example: Fetch logic placeholder
  useEffect(() => {
    // You can replace this with real API call like:
    // fetch('/api/device-history')
    //   .then(res => res.json())
    //   .then(data => setHistoryData(data));
  }, []);

  const cellStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'center',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Device History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={cellStyle}>Device ID</th>
            <th style={cellStyle}>Regen Cycle Count</th>
            <th style={cellStyle}>Started At</th>
            <th style={cellStyle}>Ended At</th>
            <th style={cellStyle}>Duration</th>
            <th style={cellStyle}>Trigger Type</th>
            <th style={cellStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {historyData.length === 0 ? (
            <tr>
              <td colSpan="7" style={cellStyle}>No data available</td>
            </tr>
          ) : (
            historyData.map((item, index) => (
              <tr key={index}>
                <td style={cellStyle}>{item.deviceId}</td>
                <td style={cellStyle}>{item.regenCycleCount}</td>
                <td style={cellStyle}>{item.startedAt}</td>
                <td style={cellStyle}>{item.endedAt}</td>
                <td style={cellStyle}>{item.duration}</td>
                <td style={cellStyle}>{item.triggerType}</td>
                <td style={cellStyle}>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceRegenHistory;

