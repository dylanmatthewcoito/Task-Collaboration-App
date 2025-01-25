import React, { useState, useEffect } from 'react';
import { Trash2, Check, Plus } from 'lucide-react';

// Mock WebSocket service
const mockWebSocket = {
  callbacks: new Set(),
  emit(task) {
    this.callbacks.forEach(callback => callback(task));
  },
  onMessage(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }
};

// Task Form Component
const TaskForm = ({ newTask, setNewTask, onSubmit }) => (
  <form onSubmit={onSubmit} className="flex gap-2 mb-6">
    <input
      type="text"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Add a new task..."
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
    >
      <Plus size={20} />
      Add Task
    </button>
  </form>
);

// Task Item Component
const TaskItem = ({ task, onToggle, onDelete }) => (
  <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle(task.id)}
        className={`p-2 rounded-full ${
          task.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
        }`}
      >
        <Check size={16} />
      </button>
      <span className={task.completed ? 'line-through text-gray-500' : ''}>
        {task.text}
      </span>
    </div>
    <button
      onClick={() => onDelete(task.id)}
      className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
    >
      <Trash2 size={16} />
    </button>
  </li>
);

// Main App Component
const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const cleanup = mockWebSocket.onMessage((task) => {
      setTasks(prev => [...prev, task]);
    });
    return cleanup;
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };
    
    mockWebSocket.emit(task);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Collaborative Tasks</h1>
      
      <TaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        onSubmit={addTask}
      />

      <ul className="space-y-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;