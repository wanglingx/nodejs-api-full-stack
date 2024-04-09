import { useEffect, useState } from 'react';

const useCalculation = (a, b, operator) => {
    const [result, setResult] = useState(null);
    a = parseInt(a)
    b = parseInt(b)

    useEffect(() => {
        let calculatedResult;
        switch (operator) {
            case '+':
                calculatedResult = a + b;
                break;
            case '-':
                calculatedResult = a - b;
                break;
            case '*':
                calculatedResult = a * b;
                break;
            case '/':
                calculatedResult = a / b;
                break;
            default:
                calculatedResult = null; // Handle invalid operator
                break;
        }
        setResult(calculatedResult);
    }, [a, b, operator]);

    return [result];
};

export default useCalculation;
