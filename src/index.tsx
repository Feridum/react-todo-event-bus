import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventBusContextController, EventListenerType } from './context/EventBus/EventBusContextController';


const handleAddTask: EventListenerType = {
  event: 'addTask',
  callback: (e: CustomEvent, eventBus) => {
    const localStorageTasks = localStorage.getItem('tasks')

    const tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];

    const newTasks = [...tasks, e.detail];
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    eventBus.dispatchEvent('taskList', { data: newTasks })
  }
}

const fetchTasks: EventListenerType = {
  event: 'fetchTasks',
  callback: (_, eventBus) => {
    const localStorageTasks = localStorage.getItem('tasks')

    const tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];

    eventBus.dispatchEvent('taskList', { data: tasks })
  }
}



ReactDOM.render(
  <EventBusContextController listeners={[handleAddTask, fetchTasks]}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </EventBusContextController>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
