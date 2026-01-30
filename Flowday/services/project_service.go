package services

import (
	"context"
	"fmt"
	"time"
)

type Project struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Color string `json:"color"` // Hex code
}

type ProjectService struct {
	ctx      context.Context
	projects []Project
}

func NewProjectService() *ProjectService {
	return &ProjectService{
		projects: []Project{},
	}
}

func (p *ProjectService) Startup(ctx context.Context) {
	p.ctx = ctx
}

func (p *ProjectService) GetProjects() []Project {
	return p.projects
}

func (p *ProjectService) CreateProject(name string) []Project {
	newProject := Project{
		ID:    fmt.Sprintf("%d", time.Now().UnixNano()),
		Name:  name,
		Color: "#FFFFFF", // Default color
	}
	p.projects = append(p.projects, newProject)
	return p.projects
}

func (p *ProjectService) DeleteProject(id string) []Project {
	keep := []Project{}
	for _, proj := range p.projects {
		if proj.ID != id {
			keep = append(keep, proj)
		}
	}
	p.projects = keep
	return p.projects
}
