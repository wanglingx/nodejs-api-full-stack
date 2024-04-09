import React, { useState, useMemo } from 'react';

function Form({ onFormClicked }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operator, setOperator] = useState('');
  

const calculate = (a, b,operator) => {
    a = parseInt(a);
    b = parseInt(b);
    let calculatedResult = 0;
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
        
    return calculatedResult;
  };

//   const sum = useMemo(() => {
//     return calculate(a, b);
//   }, [a, b]);

    const handleSubmit = () => {
        const sum = calculate(a, b, operator)
        let newFormData = {
            a: a,
            b: b,
            operator : operator,
            sum : sum,
        };
        onFormClicked(newFormData);
    };

  return (
    <>
      <label>
        a:
        <input type="text" name="a" aria-label="a" placeholder="Input a" onChange={(e) => setA(e.target.value)} />
      </label>
      <label>
        b:
        <input type="text" name="b" aria-label="b" placeholder="Input b" onChange={(e) => setB(e.target.value)} />
      </label>

      {/* <input type="text" name="counter" aria-label='counter'/> */}
     <label>
        operator:
        <select type="dropdown" name="operator" onChange={(e) => setOperator(e.target.value)}>
          <option value={''} defaultValue>
            ---Select Operator---
          </option>
          <option value={'+'}>+</option>
          <option value={'-'}>-</option>
          <option value={'*'}>*</option>
          <option value={'/'}>/</option>
        </select>
      </label>
      
          
      <button type="submit"  onClick={handleSubmit}>submit</button>
    </>
  );
}

export default Form;
