import React from 'react';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Zustand To-Do App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
