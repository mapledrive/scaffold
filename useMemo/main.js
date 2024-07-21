import React from 'react';

// Это пример использования React-хука useMemo.
// Компонент рендерит список пользователей и фильтрует их по имени
// но фильтр не работает по печати в инпут, а по нажатию кнопки
// filterUsers не меняются, когда пишешь в инпут, меняется только когда кнопка нажата,
// но главная проблема что функция-калбек внутри users.filter отрабатывает после каждого нажатия в инпуте
// Однако, если бы массив был огромный и
// функция-калбек внутри users.filter( отрабатывала бы после каждого нажатия в инпуте
// мы могли бы замедлить работу приложения.
// В данном случае возвращаемое из функции значение в filteredUsers нужно мемоизировать
// и функция будет запускаться только если зависимость (тут search) изменилась

const users = [
  { id: 'a', name: 'robin' },
  { id: 'b', name: 'dennis' },
  { id: 'c', name: 'jimmy' },
  { id: 'd', name: 'bryan' },
  { id: 'e', name: 'john' },
];

const App = () => {
  const [text, setText] = React.useState('');
  const [search, setSearch] = React.useState('');

  const handleText = event => setText(event.target.value);
  const handleSearch = () => setSearch(text);

  // const filteredUsers = users.filter(user => user.name.includes(search));

  const filteredUsers = React.useMemo(
    () => users.filter(user => user.name.includes(search)),
    [search]
  );

  return (
    <div>
      <input type='text' value={text} onChange={handleText} />
      <button type='button' onClick={handleSearch}>
        Search
      </button>
      <ul>
        {filteredUsers.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
