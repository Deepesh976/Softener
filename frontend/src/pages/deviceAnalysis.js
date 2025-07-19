import React, { useEffect, useState } from 'react';

const DeviceAnalysis = () => {
  const [analysisData, setAnalysisData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      console.log("DeviceAnalysis mounted");
      try {
        const res = await fetch('http://192.168.0.207:3001/softener/api/data/fetch/analysis/all');
        const data = await res.json();
        setAnalysisData(data.response || []);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Device Analysis</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Device ID</th>
              <th style={styles.th}>Regen Cycle Count</th>
              <th style={styles.th}>Litres Set</th>
              <th style={styles.th}>Remaining Litres</th>
              <th style={styles.th}>Flow Rate</th>
              <th style={styles.th}>Salt Status</th>
              <th style={styles.th}>Regen Mode</th>
              <th style={styles.th}>Pause Mode</th>
              <th style={styles.th}>Fault Code</th>
              <th style={styles.th}>Time Left</th>
              <th style={styles.th}>Total Dispensed Litres</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {analysisData.map((item, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.regenCycleCount}</td>
                <td style={styles.td}>{item.litresSet}</td>
                <td style={styles.td}>{item.remainingLitres || '—'}</td>
                <td style={styles.td}>{item.flowRate}</td>
                <td style={styles.td}>{item.saltStatus}</td>
                <td style={styles.td}>{item.regenMode ? 'Yes' : 'No'}</td>
                <td style={styles.td}>{item.pauseMode ? 'Yes' : 'No'}</td>
                <td style={styles.td}>{item.faultCode ? 'Yes' : 'No'}</td>
                <td style={styles.td}>{item.timeLeft}</td>
                <td style={styles.td}>{item.totalDispensedLitres}</td>
                <td style={styles.td}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9fafc',
    minHeight: '100vh',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  tableWrapper: {
    overflowX: 'auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '1000px',
  },
  th: {
    padding: '12px 16px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #eaeaea',
    color: '#333',
    fontSize: '14px',
  },
  tr: {
    transition: 'background 0.2s',
  },
};

export default DeviceAnalysis;
