import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useTodoStore = create(
  devtools(
    persist(
      (set) => ({
        todos: [],

        // Add a new todo with an initial status of 'new'
        addTodo: (text) => {
          const newTodo = { id: Date.now(), text, status: 'new' };
          set((state) => ({ todos: [...state.todos, newTodo] }));
        },

        // Remove a todo by its ID
        removeTodo: (id) => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          }));
        },

        // Update the status of a todo
        updateTodoStatus: (id, newStatus) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, status: newStatus } : todo
            ),
          }));
        },
      }),
      {
        name: 'todo-storage', // Persist data in localStorage
      }
    )
  )
);

export default useTodoStore;
