import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import { todoService } from '../services/todoService';
import { TodoColumn } from './TodoColumn';
import { TodoForm } from './TodoForm';
import './TodoBoard.css';

export const TodoBoard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await todoService.findTodos({
        pagination: { page: 1, limit: 100 }
      });
      setTodos(response.todos);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入待辦事項失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddNew = () => {
    setEditingTodo(undefined);
    setShowForm(true);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: CreateTodoRequest | UpdateTodoRequest) => {
    try {
      if ('id' in data) {
        // 更新
        await todoService.updateTodo(data);
      } else {
        // 新增
        await todoService.createTodo(data);
      }
      
      setShowForm(false);
      setEditingTodo(undefined);
      await loadTodos(); // 重新載入資料
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失敗');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('確定要刪除這個待辦事項嗎？')) {
      try {
        await todoService.deleteTodo(id);
        await loadTodos(); // 重新載入資料
      } catch (err) {
        setError(err instanceof Error ? err.message : '刪除失敗');
      }
    }
  };

  const handleStatusChange = async (id: number, status: 'pending' | 'doing' | 'done') => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await todoService.updateTodo({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status,
          due_date: todo.due_date
        });
        await loadTodos(); // 重新載入資料
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新狀態失敗');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTodo(undefined);
  };

  const groupedTodos = {
    pending: todos.filter(todo => todo.status === 'pending'),
    doing: todos.filter(todo => todo.status === 'doing'),
    done: todos.filter(todo => todo.status === 'done')
  };

  if (loading) {
    return <div className="loading">載入中...</div>;
  }

  return (
    <div className="todo-board">
      <header className="board-header">
        <h1>Todo List 看板</h1>
        {error && <div className="error-message">{error}</div>}
      </header>

      <div className="board-columns">
        <TodoColumn
          title="待處理"
          status="pending"
          todos={groupedTodos.pending}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onAddNew={handleAddNew}
        />
        
        <TodoColumn
          title="進行中"
          status="doing"
          todos={groupedTodos.doing}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
        
        <TodoColumn
          title="已完成"
          status="done"
          todos={groupedTodos.done}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      {showForm && (
        <TodoForm
          todo={editingTodo}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};