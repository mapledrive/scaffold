import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type InputType = [string, (event: React.ChangeEvent<HTMLInputElement>) => void];

const useInput = (initialValue: string | '' = ''): InputType => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return [inputValue, onInputChange];
};

const ParamEditor: React.FC = () => {
  const [name, handleNameChange] = useInput();
  const [length, handleLengthChange] = useInput();

  return (
    <div className='input-group'>
      <label htmlFor='name'>Назначение</label>
      <input
        type='text'
        id='name'
        name='name'
        value={name}
        onChange={handleNameChange}
      />
      <label htmlFor='length'>Длина</label>
      <input
        type='text'
        id='length'
        name='length'
        value={length}
        onChange={handleLengthChange}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<ParamEditor />);
