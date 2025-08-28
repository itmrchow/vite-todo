import React from 'react';
import { Todo } from '../types/todo';
import './TodoCard.css';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'pending' | 'doing' | 'done') => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ 
  todo, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ff6b6b';
      case 'doing': return '#feca57';
      case 'done': return '#48dbfb';
      default: return '#ddd';
    }
  };

  return (
    <div className="todo-card">
      <div className="todo-header">
        <h3 className="todo-title">{todo.title}</h3>
        <div className="todo-actions">
          <button 
            className="edit-btn"
            onClick={() => onEdit(todo)}
          >
            編輯
          </button>
          <button 
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
          >
            刪除
          </button>
        </div>
      </div>
      
      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}
      
      <div className="todo-footer">
        <div className="status-controls">
          <select 
            value={todo.status} 
            onChange={(e) => onStatusChange(todo.id, e.target.value as 'pending' | 'doing' | 'done')}
            style={{ backgroundColor: getStatusColor(todo.status) }}
          >
            <option value="pending">待處理</option>
            <option value="doing">進行中</option>
            <option value="done">已完成</option>
          </select>
        </div>
        
        <div className="todo-dates">
          {todo.due_date && (
            <div className="due-date">
              到期: {formatDate(todo.due_date)}
            </div>
          )}
          <div className="created-date">
            建立: {formatDate(todo.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};