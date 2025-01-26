// src/components/TaskForm.jsx
import { Plus } from 'lucide-react';

export const TaskForm = ({ newTask, setNewTask, onSubmit }) => (
  <form onSubmit={onSubmit} className="flex gap-2 mb-6">
    <input
      type="text"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Add a new task..."
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      data-testid="task-input"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
      data-testid="add-task-button"
    >
      <Plus size={20} />
      Add Task
    </button>
  </form>
);

// src/components/TaskItem.jsx
import { Trash2, Check } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onDelete }) => (
  <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle(task.id)}
        className={`p-2 rounded-full ${task.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        data-testid="toggle-task"
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
      data-testid="delete-task"
    >
      <Trash2 size={16} />
    </button>
  </li>
);

// src/services/webSocket.js
export const createWebSocketService = () => ({
  callbacks: new Set(),
  emit(task) {
    this.callbacks.forEach(callback => callback(task));
  },
  onMessage(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }
});

// src/hooks/useWebSocket.js
import { useEffect } from 'react';

export const useWebSocket = (socket, onMessage) => {
  useEffect(() => {
    const cleanup = socket.onMessage(onMessage);
    return cleanup;
  }, [socket, onMessage]);
};

// src/tests/TaskApp.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import { TaskApp } from '../TaskApp';

describe('TaskApp', () => {
  test('adds a new task', () => {
    render(<TaskApp />);
    const input = screen.getByTestId('task-input');
    const button = screen.getByTestId('add-task-button');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('toggles task completion', () => {
    render(<TaskApp />);
    // Add task first
    fireEvent.change(screen.getByTestId('task-input'), { 
      target: { value: 'Test Task' } 
    });
    fireEvent.click(screen.getByTestId('add-task-button'));
    
    // Toggle completion
    fireEvent.click(screen.getByTestId('toggle-task'));
    expect(screen.getByText('Test Task')).toHaveClass('line-through');
  });

  test('deletes a task', () => {
    render(<TaskApp />);
    // Add task
    fireEvent.change(screen.getByTestId('task-input'), {
      target: { value: 'Delete Me' }
    });
    fireEvent.click(screen.getByTestId('add-task-button'));
    
    // Delete task
    fireEvent.click(screen.getByTestId('delete-task'));
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });
});