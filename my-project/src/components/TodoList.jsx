import React, { useState } from 'react';
import useTodoStore from '../store/todoStore';

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const updateTodoStatus = useTodoStore((state) => state.updateTodoStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const [filter, setFilter] = useState('all'); // Filter: all, new, in_progress, completed

  // Filter todos based on status
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'new') return todo.status === 'new';
    if (filter === 'in_progress') return todo.status === 'in_progress';
    if (filter === 'completed') return todo.status === 'completed';
    return true; // Show all todos
  });

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      {/* Filter Buttons */}
      <div className="relative mb-4">
  {/* Dropdown Toggle Button */}
  <button
    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
    onClick={() => setIsDropdownOpen((prev) => !prev)}
  >
    {filter.replace('_', ' ').toUpperCase()}
  </button>

  {/* Dropdown Menu */}
  {isDropdownOpen && (
    <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-48">
      {['all', 'new', 'in_progress', 'completed'].map((status) => (
        <li key={status}>
          <button
            onClick={() => {
              setFilter(status);
              setIsDropdownOpen(false); // Close dropdown after selection
            }}
            className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              filter === status ? 'bg-blue-100 font-bold' : ''
            }`}
          >
            {status.replace('_', ' ').toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>


      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-4 mb-2 border rounded-lg shadow-sm ${
              todo.status === 'completed'
                ? 'bg-green-50 border-green-300 text-green-800 '
                : todo.status === 'in_progress'
                ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                : 'bg-gray-50 border-gray-300 text-gray-800'
            }`}
          >
            <span className="flex-1">
              {todo.text} ({todo.status.replace('_', ' ').toUpperCase()})
            </span>
            {/* Dropdown to Change Status */}
            <select
              value={todo.status}
              onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
              className="px-2 py-1 bg-white border border-gray-300 rounded-lg"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {/* Remove Button */}
            <button
              onClick={() => removeTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:bg-red-100 rounded transition ml-2"
            >
              Delete
            </button>
          </li>
        ))}
        {filteredTodos.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No tasks to show for this filter.
          </p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
