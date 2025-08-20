package main

import (
	"log"

	"todo-list-api/internal/database"
	"todo-list-api/internal/handler"
)

func main() {
	database.Init()

	r := handler.SetupRouter()

	log.Println("Starting Todo List API server on :8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
