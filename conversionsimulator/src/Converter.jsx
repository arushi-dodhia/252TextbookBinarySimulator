import React from 'react';
import { useNavigate } from 'react-router-dom';

function Converter() {
  const navigate = useNavigate();

  const conversionOptions = [
    { label: 'Decimal to Unsigned Int', type: 'decimalToUnsignedInt' },
    { label: 'Decimal to Ones Comp', type: 'decimalToOnesComp' },
    { label: 'Decimal to Twos Comp', type: 'decimalToTwosComp' },
    { label: 'Unsigned Int to Decimal', type: 'unsignedIntToDecimal' },
    { label: 'Ones Comp to Decimal', type: 'onesCompToDecimal' },
    { label: 'Twos Comp to Decimal', type: 'twosCompToDecimal' },
  ];

  const handleNavigation = (type) => {
    navigate(`/conversion/${type}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Click to Convert:</h2>
      <div style={styles.buttonsContainer}>
        {conversionOptions.map((option) => (
          <button
            key={option.type}
            style={styles.button}
            onClick={() => handleNavigation(option.type)}
          >
            {option.label}
            <span style={styles.arrow}>&rarr;</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e8e8e8',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  arrow: {
    fontSize: '18px',
  },
};

export default Converter;