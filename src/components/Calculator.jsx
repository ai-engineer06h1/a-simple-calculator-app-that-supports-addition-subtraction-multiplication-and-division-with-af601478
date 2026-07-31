import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch('/api/calculations');
      const data = await response.json();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  const handleCalculate = () => {
    const calcResult = eval(input);
    setResult(calcResult);
    saveHistory(input, calcResult);
  };

  const saveHistory = async (expression, result) => {
    await fetch('/api/calculations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression, result }),
    });
    setHistory(prev => [...prev, { expression, result }]);
  };

  return (
    <div className="calculator">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter calculation"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
      <h3>Calculation History:</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item.expression} = {item.result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calculator;