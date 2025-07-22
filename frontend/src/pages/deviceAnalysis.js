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
      {/* Header Row with Title & Dropdown */}
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Device Analysis</h2>
        <div style={styles.controls}>
          <select style={styles.dropdown} value={filter} onChange={handleFilterChange}>
            <option value="">All Devices</option>
            {[...new Set(analysisData.map(d => d.id))].map((id, i) => (
              <option key={i} value={id}>{id}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              {[
                "Device ID", "Regen Cycle Count", "Litres Set", "Flow Rate", "Salt Status",
                "Regen Mode", "Pause Mode", "Fault Code", "Time Left", "Total Dispensed Litres", "Date"
              ].map((heading, index) => (
                <th key={index} style={styles.th}>{heading}</th>
              ))}
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
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f9f9fb',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1250px',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    padding: '0 10px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: 0,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  dropdown: {
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    minWidth: '200px',
    background: '#fff',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    maxWidth: '1250px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    minWidth: '1000px',
  },
  thead: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#007bff',
    color: '#fff',
    zIndex: 1,
  },
  th: {
    padding: '14px 10px',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
    borderBottom: '1px solid #ddd',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 10px',
    textAlign: 'center',
    borderBottom: '1px solid #eaeaea',
    color: '#333',
    backgroundColor: '#fff',
    whiteSpace: 'nowrap',
  },
  tr: {
    transition: 'background 0.2s',
  },
};

export default DeviceAnalysis;
