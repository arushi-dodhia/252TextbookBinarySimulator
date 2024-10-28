import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ConversionScreen() {
  const { type } = useParams();
  const [decimal, setDecimal] = useState('');
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleConvert = () => {
    let stepsArray = [];
    let conversionResult;

    switch (type) {
      case 'decimalToUnsignedInt':
        conversionResult = parseInt(decimal, 10);
        stepsArray.push(`Converting ${decimal} to unsigned integer: ${conversionResult}`);
        break;
      case 'decimalToOnesComp':
        conversionResult = ~parseInt(decimal, 10);
        stepsArray.push(`Applying ones complement to ${decimal}: ${conversionResult}`);
        break;
      case 'decimalToTwosComp':
        conversionResult = (~parseInt(decimal, 10) + 1);
        stepsArray.push(`Applying twos complement to ${decimal}: ${conversionResult}`);
        break;
      case 'unsignedIntToDecimal':
        conversionResult = parseInt(decimal, 10);
        stepsArray.push(`Unsigned integer ${decimal} to decimal: ${conversionResult}`);
        break;
      case 'onesCompToDecimal':
        conversionResult = ~parseInt(decimal, 10);
        stepsArray.push(`Ones complement ${decimal} to decimal: ${conversionResult}`);
        break;
      case 'twosCompToDecimal':
        conversionResult = ~parseInt(decimal, 10) + 1;
        stepsArray.push(`Twos complement ${decimal} to decimal: ${conversionResult}`);
        break;
      default:
        stepsArray.push('Invalid conversion type');
        conversionResult = 'Error';
    }

    setSteps(stepsArray);
    setResult(conversionResult);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>&larr; Back</button>
      <h2 style={styles.header}>{type.replace(/([A-Z])/g, ' $1')} Conversion:</h2>
      
      <div style={styles.inputContainer}>
        <label style={styles.label}>Enter Decimal Number:</label>
        <input
          type="number"
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          style={styles.input}
        />
      </div>
      
      <button style={styles.convertButton} onClick={handleConvert}>Convert</button>
      
      <div style={styles.stepsContainer}>
        <h3 style={styles.stepsHeader}>Conversion Steps</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      <div style={styles.resultContainer}>
        <strong>Result:</strong> {result !== null ? result : 'N/A'}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    cursor: 'pointer',
    marginBottom: '10px',
    border: 'none',
    backgroundColor: 'transparent',
  },
  header: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  convertButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  stepsContainer: {
    backgroundColor: '#e8e8e8',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  stepsHeader: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  resultContainer: {
    backgroundColor: '#e8e8e8',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default ConversionScreen;
