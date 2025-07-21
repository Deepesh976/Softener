import React, { useEffect, useState } from 'react';

const DeviceAnalysis = () => {
  const [analysisData, setAnalysisData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.softener.site/softener/api/data/fetch/analysis/all');
        const data = await res.json();
        setAnalysisData(data.response || []);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = filter
    ? analysisData.filter(item => item.id?.toLowerCase().includes(filter.toLowerCase()))
    : analysisData;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <select style={styles.dropdown} value={filter} onChange={handleFilterChange}>
          <option value="">All Devices</option>
          {[...new Set(analysisData.map(d => d.id))].map((id, i) => (
            <option key={i} value={id}>{id}</option>
          ))}
        </select>
        <h2 style={styles.title}>Device Analysis</h2>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Device ID</th>
              <th style={styles.th}>Regen Cycle Count</th>
              <th style={styles.th}>Litres Set</th>
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
            {filteredData.map((item, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.regenCycleCount}</td>
                <td style={styles.td}>{item.litresSet}</td>
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
    padding: '6rem',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to bottom right, #f0f2f5, #e6ecf2)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  dropdown: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
    textAlign: 'center',
  },
  tableWrapper: {
    width: '110%',
    maxWidth: '1250px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    backgroundColor: '#fff',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  td: {
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #eaeaea',
    color: '#333',
  },
  tr: {
    transition: 'background 0.2s',
  },
};

export default DeviceAnalysis;
