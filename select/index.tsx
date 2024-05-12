import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [selectedOption, setSelectedOption] = useState<string>('black');

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <>
      <select
        value={selectedOption} // ...force the select's value to match the state variable...
        onChange={selectChange}
      >
        <option value='black'>Black</option>
        <option value='red'>Red</option>
        <option value='green'>Green</option>
        <option value='yellow'>Yellow</option>
      </select>
      {selectedOption && <h2>{selectedOption}</h2>}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
