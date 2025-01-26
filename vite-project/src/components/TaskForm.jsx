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

