import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { useEventBus } from './hooks/useEventBus';


type Task = {
  name: string;
}

function App() {
  const { dispatchEvent, subscribeToEvent } = useEventBus()
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTaskList = useCallback((e: CustomEvent) => {
    setTasks(e.detail.data)
  }, [setTasks]);

  useEffect(() => {
    const { removeListener } = subscribeToEvent('taskList', handleTaskList);
    dispatchEvent('fetchTasks');

    return () => {
      removeListener();
    }
  }, [subscribeToEvent, dispatchEvent, handleTaskList])


  const handleAddTask = ()=>{
    console.log(inputRef.current?.value);

    if(inputRef.current?.value){
      dispatchEvent('addTask', { name: inputRef.current?.value })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input name='taskName' ref={inputRef}/>
          <button onClick={handleAddTask}>Add task</button>
        </div>

        {tasks.map((task, index) => {
          return <div key={`task_${index}`}>{task.name}</div>
        })}
      </header>
    </div>
  );
}

export default App;
