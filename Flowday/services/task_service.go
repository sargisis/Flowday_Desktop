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
	ProjectID string `json:"projectId"` // New field
}

type TaskService struct {
	ctx   context.Context
	tasks []Task
}

func NewTaskService() *TaskService {
	// Start with empty tasks
	return &TaskService{
		tasks: []Task{},
	}
}

func (t *TaskService) Startup(ctx context.Context) {
	t.ctx = ctx
}

func (t *TaskService) GetTasks() []Task {
	return t.tasks
}

func (t *TaskService) CreateTask(title string, projectID string) []Task {
	newTask := Task{
		ID:        fmt.Sprintf("%d", time.Now().UnixNano()),
		Title:     title,
		Completed: false,
		CreatedAt: time.Now().Format(time.RFC3339),
		ProjectID: projectID,
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
	// Initialize with empty slice to ensure [] is returned instead of nil
	newTasks := []Task{}
	for _, task := range t.tasks {
		if task.ID != id {
			newTasks = append(newTasks, task)
		}
	}
	t.tasks = newTasks
	return t.tasks
}
