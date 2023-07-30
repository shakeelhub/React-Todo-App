import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const addTask = () => {
    if (taskName.trim() === '') return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: 'not completed',
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDescription('');
  };

  const editTask = (id, name, description) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          name,
          description,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const changeStatus = (id, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: newStatus,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const filterTasks = task => {
    if (filterStatus === 'completed') return task.status === 'completed';
    if (filterStatus === 'not completed') return task.status === 'not completed';
    return true; // Show all tasks
  };

  return (
    <div className='todo-app-container'>
      <h2 className='header' style={{color:'#0dde7d'}}>My Todo </h2>
      <div className='form-container'>
      <input
        type="text"
        placeholder="Todo Name"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        className='spacing'
        required
      />
      <textarea
        placeholder="Todo Description"
        rows='1'
        className='spacing'
        value={taskDescription}
        onChange={e => setTaskDescription(e.target.value)}
        required
      />
      <button onClick={addTask} className='add_button'>Add Todo</button>
      </div>
      

      <div className='filter-container '>
        <label style={{fontWeight:'bold'}}>My Todos</label>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{backgroundColor:'rgba(181,106,61)'}}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>

    
      
      {tasks.filter(filterTasks).map(task => (
        <div key={task.id} className='card-container card1'>
          <h6>Name:{task.name}</h6>
          <p>Description:{task.description}</p>
          <p>
            Status:{' '}
            <select value={task.status} onChange={e => changeStatus(task.id, e.target.value)} className={`card ${task.status === 'completed' ? 'completed' : 'not-completed'}`} >
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
          </p>
          <div className='button'> 
          <button className='button1' onClick={() => editTask(task.id, prompt('Enter updated name'), prompt('Enter updated description'))}>
            Edit
          </button>
          <button className='button2' onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default TodoApp;
