import React from 'react';
import ReactDOM from 'react-dom/client';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
// Сначала импортируем observable и action из MobX и observer из MobX-React
// Создаем store при помощи observable, он будет содержать состояние count
// Создаем action c именем increment используя декоратор action. 
// Эта функция увеличивает count внутри store.
const counterStore = observable({
  count: 0,
  increment: action(() => {
    counterStore.count++;
  }),
});

// Функциональный компонент обернут в observer.
// Внутри компонента рендерим текущее значение count используя counterStore.count
// Нажатие кнопки - обработчик onClick вызывает экшн counterStore.increment
// который обновляет count в store.
const Example = observer(() => (
  <div>
    <div>Count: {counterStore.count}</div>
    <button onClick={counterStore.increment}>Increase</button>
  </div>
));

ReactDOM.createRoot(document.getElementById('root')).render(<Example />);
// MobX uses a centralized store to manage state, whereas React uses component state with useState.
// MobX автоматически обновляет компоненты обернутые в observer когда стор изменяется.
// React требует ручное обновление стейта с setCounter.

// MobX различает следующие три концепции в вашем приложении:

// State(Состояние)
// Actions(Действия)
// Derivations(Производные)

// Mobx простая и понятная в использовании библиотека, в отличии от Redux
// требующая минимум шаблонного кода для инициализации стора.

// https://www.robinwieruch.de/redux-mobx/