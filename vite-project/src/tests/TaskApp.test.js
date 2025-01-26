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