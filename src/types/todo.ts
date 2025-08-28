export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'doing' | 'done';
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  status?: 'pending' | 'doing' | 'done';
  due_date?: string;
}

export interface UpdateTodoRequest {
  id: number;
  title: string;
  description?: string;
  status?: 'pending' | 'doing' | 'done';
  due_date?: string;
}

export interface FindTodoRequest {
  keyword?: string;
  status?: 'pending' | 'doing' | 'done';
  created_from?: string;
  created_to?: string;
  due_from?: string;
  due_to?: string;
  pagination: {
    page: number;
    limit: number;
  };
}

export interface FindTodoResponse {
  todos: Todo[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}