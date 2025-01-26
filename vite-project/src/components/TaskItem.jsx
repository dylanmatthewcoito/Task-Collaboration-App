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

