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
        let num = parseInt(decimal, 10);
        stepsArray.push(`Step 1: Start with ${num}.`);
        let binarySteps = [];
        
        while (num > 0) {
          binarySteps.push(num % 2); 
          stepsArray.push(`Divide ${num} by 2: Remainder is ${num % 2}`);
          num = Math.floor(num / 2); 
        }
        
        binarySteps.reverse(); 
        conversionResult = binarySteps.join(''); 
        stepsArray.push(`Result as Binary Unsigned Integer: ${conversionResult}`);
        break;

      case 'decimalToOnesComp':
        let num1 = parseInt(decimal, 10);
        stepsArray.push(`Step 1: Start with ${num1}.`);


        let binarySteps1 = [];
        while (num1 > 0) {
          binarySteps1.push(num1 % 2); 
          stepsArray.push(`Divide ${num1} by 2: Remainder is ${num1 % 2}`);
          num1 = Math.floor(num1 / 2); 
        }
        
        binarySteps1.reverse(); 
        const binaryString = binarySteps1.join('');
        stepsArray.push(`Step 2: Binary representation is ${binaryString}.`);


        let onesComplement = binarySteps1.map(bit => (bit === 0 ? 1 : 0)); 
        stepsArray.push(`Step 3: Flip the bits of ${binaryString} to get one's complement.`);
        stepsArray.push(`One's complement binary is ${onesComplement.join('')}.`);

        break;

        case 'decimalToTwosComp':
          let num2 = parseInt(decimal, 10);
          stepsArray.push(`Step 1: Start with ${num2}.`);
  
          let binarySteps2 = [];
          while (num2 > 0) {
            binarySteps2.push(num2 % 2); 
            stepsArray.push(`Divide ${num2} by 2: Remainder is ${num2 % 2}`);
            num2 = Math.floor(num2 / 2); 
          }
  
          binarySteps2.reverse(); 
          const binaryString2 = binarySteps2.join('');
          stepsArray.push(`Step 2: Binary representation is ${binaryString2}.`);
  
          let onesComp = binarySteps2.map(bit => (bit === 0 ? 1 : 0)); 
          stepsArray.push(`Step 3: Flip the bits of ${binaryString2} to get one's complement: ${onesComp.join('')}.`);
  
  
          let carry = 1; 
          let twosComplement = onesComp.slice(); 
          for (let i = twosComplement.length - 1; i >= 0; i--) {
            let sum = twosComplement[i] + carry;
            twosComplement[i] = sum % 2; 
            carry = Math.floor(sum / 2); 
          }
          
          stepsArray.push(`Step 4: Add 1 to get two's complement: ${twosComplement.join('')}.`);
          conversionResult = twosComplement.join(''); 
          stepsArray.push(`Result in Two's Complement Binary: ${conversionResult}`);
          break;

      case 'unsignedIntToDecimal':
        conversionResult = parseInt(decimal, 10);
        stepsArray.push(`Step 1: Convert unsigned integer ${decimal} to decimal.`);
        stepsArray.push(`Result: ${conversionResult}`);
        break;

      case 'onesCompToDecimal':
        conversionResult = ~parseInt(decimal, 10);
        stepsArray.push(`Step 1: Convert ones complement ${decimal} to decimal.`);
        stepsArray.push(`Result: ${conversionResult}`);
        break;

      case 'twosCompToDecimal':
        conversionResult = ~parseInt(decimal, 10) + 1;
        stepsArray.push(`Step 1: Convert twos complement ${decimal} to decimal.`);
        stepsArray.push(`Result: ${conversionResult}`);
        break;

      default:
        stepsArray.push('Invalid conversion type');
        conversionResult = 'Error';
    }

    setSteps(stepsArray);
    setResult(conversionResult);
  };

  const capitalizeWords = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
  };


  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate(-1)}
        style={styles.backButton}
      >
        Back
      </button>
      <h2 style={styles.header}>{capitalizeWords(type)} Conversion:</h2>
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          style={styles.input}
          placeholder="Enter number..."
        />
        <button 
          onClick={handleConvert}
          style={styles.convertButton}
        >
          Convert
        </button>
      </div>
      {steps.length > 0 && (
        <div style={styles.stepsContainer}>
          <h3 style={styles.stepsHeader}>Conversion Steps</h3>
          <ul style={styles.stepsList}>
            {steps.map((step, index) => (
              <li key={index} style={styles.step}>{step}</li>
            ))}
          </ul>
        </div>
      )}
      {result !== null && (
        <div style={styles.resultContainer}>
          <span style={styles.resultLabel}>Result:</span> {result}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#e8e8e8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  convertButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  stepsContainer: {
    marginTop: '20px',
  },
  stepsHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  stepsList: {
    listStyleType: 'none',
    padding: '0',
  },
  step: {
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  resultContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e8e8e8',
    borderRadius: '4px',
  },
  resultLabel: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
};

export default ConversionScreen;