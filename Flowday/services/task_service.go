package services

import (
	"context"
	"fmt"
	"time"
)

type Task struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	CreatedAt string `json:"createdAt"`
}

type TaskService struct {
	ctx   context.Context
	tasks []Task
}

func NewTaskService() *TaskService {
	// Mock initial tasks
	return &TaskService{
		tasks: []Task{
			{ID: "1", Title: "Rocket Launch Protocol", Completed: false, CreatedAt: time.Now().String()},
			{ID: "2", Title: "Deep Work Session", Completed: true, CreatedAt: time.Now().String()},
		},
	}
}

func (t *TaskService) Startup(ctx context.Context) {
	t.ctx = ctx
}

func (t *TaskService) GetTasks() []Task {
	return t.tasks
}

func (t *TaskService) CreateTask(title string) []Task {
	newTask := Task{
		ID:        fmt.Sprintf("%d", time.Now().UnixNano()),
		Title:     title,
		Completed: false,
		CreatedAt: time.Now().Format(time.RFC3339),
	}
	t.tasks = append(t.tasks, newTask)
	return t.tasks
}

func (t *TaskService) ToggleTask(id string) []Task {
	for i, task := range t.tasks {
		if task.ID == id {
			t.tasks[i].Completed = !t.tasks[i].Completed
			break
		}
	}
	return t.tasks
}

func (t *TaskService) DeleteTask(id string) []Task {
	var newTasks []Task
	for _, task := range t.tasks {
		if task.ID != id {
			newTasks = append(newTasks, task)
		}
	}
	t.tasks = newTasks
	return t.tasks
}
