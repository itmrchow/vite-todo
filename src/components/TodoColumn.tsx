import React from 'react';
import { Todo } from '../types/todo';
import { TodoCard } from './TodoCard';
import './TodoColumn.css';

interface TodoColumnProps {
  title: string;
  status: 'pending' | 'doing' | 'done';
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'pending' | 'doing' | 'done') => void;
  onAddNew?: () => void;
}

export const TodoColumn: React.FC<TodoColumnProps> = ({
  title,
  status,
  todos,
  onEdit,
  onDelete,
  onStatusChange,
  onAddNew
}) => {
  const getColumnColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ff6b6b';
      case 'doing': return '#feca57';
      case 'done': return '#48dbfb';
      default: return '#ddd';
    }
  };

  return (
    <div className="todo-column">
      <div 
        className="column-header"
        style={{ backgroundColor: getColumnColor(status) }}
      >
        <h2>{title}</h2>
        <span className="todo-count">{todos.length}</span>
      </div>
      
      <div className="column-content">
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
        
        {status === 'pending' && onAddNew && (
          <button className="add-new-btn" onClick={onAddNew}>
            + 新增待辦事項
          </button>
        )}
      </div>
    </div>
  );
};