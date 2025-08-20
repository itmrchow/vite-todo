# Todo List API

A RESTful API for managing todo items built with Go, Gin, and SQLite.

## Features

- Create, read, update, and delete todo items
- Filter todos by status (planning, doing, done)
- Pagination support
- SQLite database with GORM
- CORS enabled for frontend integration

## API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Todos
- `POST /api/v1/todos` - Create a new todo
- `GET /api/v1/todos` - Get all todos (with optional filtering and pagination)
- `GET /api/v1/todos/:id` - Get a specific todo by ID
- `PUT /api/v1/todos/:id` - Update a specific todo
- `DELETE /api/v1/todos/:id` - Delete a specific todo

## Query Parameters

### GET /api/v1/todos
- `status` - Filter by status (planning, doing, done)
- `limit` - Number of items to return (default: 10)
- `offset` - Number of items to skip (default: 0)

## Todo Model

```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "status": "planning",
  "due_time": "2024-01-01T00:00:00Z",
  "created_time": "2024-01-01T00:00:00Z",
  "updated_time": "2024-01-01T00:00:00Z"
}
```

### Field Validations
- `title`: Required, maximum 20 characters
- `description`: Maximum 500 characters
- `status`: Must be one of "planning", "doing", "done"

## Running the Application

1. Make sure you have Go installed (version 1.21+)
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   go mod tidy
   ```
4. Run the application:
   ```bash
   go run cmd/main.go
   ```

The API will be available at `http://localhost:8080`

## Project Structure

```
backend/
├── cmd/
│   └── main.go              # Application entry point
├── internal/
│   ├── database/
│   │   └── database.go      # Database connection and migration
│   ├── handler/
│   │   ├── router.go        # Route setup
│   │   └── todo_handler.go  # HTTP handlers
│   ├── model/
│   │   └── todo.go          # Data models
│   └── service/
│       └── todo_service.go  # Business logic
├── go.mod                   # Go modules
├── go.sum                   # Dependencies
└── README.md               # This file
```

## Database

The application uses SQLite database (`todos.db`) which will be created automatically when the application starts for the first time.