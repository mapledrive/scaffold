import { useState, memo } from 'react';
import ReactDOM from 'react-dom/client';

// Пример использования React.memo
// при изменении состояния в MemoExample оба компонента будут перерендериваться.(Component1, Component2)
// Чтобы Component1 не ререндерился при изменении переменной counter, можно использовать React.memo.
// Теперь Component1 оставляет только один консоль лог после первоначального рендеринга и 0 после ререндера.
// Чтобы попрактиковаться с React.memo, можно использовать панели приложений.
// Панели приложений, подобные приведенной выше, являются отличными тренировочными площадками для React.memo, поскольку состоят в основном из статичного контента.
// нужно открыть консоль чтобы видеть перерендер
const MemoExample = () => {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div>
      <div>Count: {counter}</div>
      <Component1 />
      <Component2 />
      <button onClick={() => setCounter(counter + 1)}>increase count</button>
    </div>
  );
};

const Component1 = memo(function Component1() {
  console.log('Component 1 rendered');
  return <div>Component 1</div>;
});

const Component2 = () => {
  console.log('Component 2 rendered');
  return <div>Component 2</div>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(<MemoExample />);
