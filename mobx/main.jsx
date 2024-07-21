import React from 'react';
import ReactDOM from 'react-dom/client';
import { observable, action } from 'mobx';
//import { observer } from 'mobx-react';
import { observer } from 'mobx-react-lite';


const store = observable({
  tasks: [
    { id: 1, title: 'Сделать покупки', completed: false },
    { id: 2, title: 'Выучить React', completed: true },
  ],
  addTask: (task) => {
    store.tasks.push({
      id: store.tasks.length + 1,
      ...task,
    });
  },
  removeTask: (id) => {
    store.tasks = store.tasks.filter((task) => task.id !== id);
  },
  toggleTaskCompletion: (id) => {
    store.tasks = store.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  },
});

const TaskList = observer(() => {
  const tasks = store.tasks;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => store.toggleTaskCompletion(task.id)}
          />
          {task.title}
        </li>
      ))}
    </ul>
  );
});

const AddTaskForm = observer(() => {
  const [newTaskTitle, setNewTaskTitle] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    store.addTask({ title: newTaskTitle });
    setNewTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(event) => setNewTaskTitle(event.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit">Добавить</button>
    </form>
  );
});

const App = () => (
  <div>
    <TaskList />
    <AddTaskForm />
  </div>
);


ReactDOM.createRoot(document.getElementById('root')).render(<App />);