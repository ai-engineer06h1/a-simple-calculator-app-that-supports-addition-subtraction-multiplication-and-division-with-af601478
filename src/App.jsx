import React, { useState } from 'react';

const App = () => {
    const [input, setInput] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState(null);

    const handleNumberClick = (number) => {
        setInput((prev) => prev + number);
    };

    const handleOperatorClick = (op) => {
        if (input === '') return;
        setOperator(op);
    };

    const calculateResult = () => {
        if (input === '' || operator === '') return;
        const [firstNum, secondNum] = input.split(operator);
        let res;
        switch (operator) {
            case '+':
                res = parseFloat(firstNum) + parseFloat(secondNum);
                break;
            case '-':
                res = parseFloat(firstNum) - parseFloat(secondNum);
                break;
            case '*':
                res = parseFloat(firstNum) * parseFloat(secondNum);
                break;
            case '/':
                res = parseFloat(firstNum) / parseFloat(secondNum);
                break;
            default:
                return;
        }
        setResult(res);
        setInput('');
        setOperator('');
    };

    const clearInputs = () => {
        setInput('');
        setOperator('');
        setResult(null);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-4 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Simple Calculator</h1>
                <div className="mb-4">
                    <input type="text" value={input} readOnly className="border rounded p-2 w-full" />
                </div>
                <div className="mb-4">
                    {['+', '-', '*', '/'].map((op) => (
                        <button key={op} className="border border-gray-300 p-2 mx-1" onClick={() => handleOperatorClick(op)}>{op}</button>
                    ))}
                    <button className="border border-gray-300 p-2 mx-1" onClick={calculateResult}>=</button>
                    <button className="border border-gray-300 p-2 mx-1" onClick={clearInputs}>C</button>
                </div>
                {result !== null && <div className="mt-4 text-xl">Result: {result}</div>}
                <div className="grid grid-cols-4 gap-2 mt-4">
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) => (
                        <button key={number} className="border border-gray-300 p-4" onClick={() => handleNumberClick(number.toString())}>{number}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;