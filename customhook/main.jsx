import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const useCounter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return [count, increment];
};

const App = () => {
  const [count, increment] = useCounter();
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
