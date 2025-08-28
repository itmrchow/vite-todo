import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import './TodoForm.css';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: CreateTodoRequest | UpdateTodoRequest) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending' as 'pending' | 'doing' | 'done',
    due_date: ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        status: todo.status,
        due_date: todo.due_date ? todo.due_date.split('T')[0] : ''
      });
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...(todo && { id: todo.id }),
      title: formData.title,
      description: formData.description || undefined,
      status: formData.status,
      due_date: formData.due_date || undefined
    };

    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="todo-form-overlay">
      <div className="todo-form-container">
        <h2>{todo ? '編輯待辦事項' : '新增待辦事項'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">標題 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="請輸入待辦事項標題"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="請輸入詳細描述（可選）"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">狀態</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">待處理</option>
              <option value="doing">進行中</option>
              <option value="done">已完成</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="due_date">到期日</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              取消
            </button>
            <button type="submit" className="submit-btn">
              {todo ? '更新' : '新增'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};