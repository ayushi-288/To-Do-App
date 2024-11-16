import { useState } from 'react';
import { TodoDate } from './TodoDate';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from './TodoLocalStorage';
import Timer from './Timer';

export const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    if (!content) return; // Prevent empty tasks
    const ifTodoContentMatched = task.find(
      (curTask) => curTask.content === content
    );
    if (ifTodoContentMatched) return; // Prevent duplicate tasks

    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  };

  // Save tasks to localStorage
  setLocalStorageTodoData(task);

  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  const handleClearTodoData = () => {
    setTask([]);
  };

  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updatedTask);
  };
  return (
    <section className="main-container">
      <div className="todo-container">
        <header className="header">
          <h1>Todo List</h1>
        </header>
        <section className="content-container">
          <TodoDate />
          <TodoForm onAddTodo={handleFormSubmit} />
          <ul className="todo-list-section">
            {task.map((curTask) => (
              <TodoList
                key={curTask.id}
                data={curTask.content}
                checked={curTask.checked}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleCheckedTodo={handleCheckedTodo}
              />
            ))}

            <button className="clear-btn" onClick={handleClearTodoData}>
              Clear all
            </button>
          </ul>
        </section>
      </div>

      <div className="pomo-container">
        <header className="header">
          <h1>Pomodoro Timer</h1>
        </header>
        <section className="content-container">
          <Timer />
        </section>
      </div>
    </section>
  );
};
