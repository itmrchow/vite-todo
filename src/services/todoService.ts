import { Todo, CreateTodoRequest, UpdateTodoRequest, FindTodoRequest, FindTodoResponse } from '../types/todo';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export class TodoService {
  async findTodos(request: FindTodoRequest): Promise<FindTodoResponse> {
    // 將前端的 limit 轉換為後端的 page_size
    const backendRequest = {
      ...request,
      pagination: {
        page: request.pagination.page,
        page_size: request.pagination.limit,
        sort_by: "created_at",
        sort_order: "desc"
      }
    };

    const response = await fetch(`${API_BASE_URL}/find-todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendRequest),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    return response.json();
  }

  async createTodo(request: CreateTodoRequest): Promise<{ id: number }> {
    const response = await fetch(`${API_BASE_URL}/create-todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create todo: ${response.statusText}`);
    }

    return response.json();
  }

  async updateTodo(request: UpdateTodoRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/update-todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update todo: ${response.statusText}`);
    }
  }

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/delete-todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.statusText}`);
    }
  }
}

export const todoService = new TodoService();