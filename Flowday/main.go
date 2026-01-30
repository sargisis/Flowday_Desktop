package main

import (
	"context"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"Flowday/services"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create Services
	authService := services.NewAuthService()
	userService := services.NewUserService()
	taskService := services.NewTaskService()
	projectService := services.NewProjectService()
	calendarService := services.NewCalendarService()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Flowday",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 1},
		Frameless:        true,
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
			authService.Startup(ctx)
			userService.Startup(ctx)
			taskService.Startup(ctx)
			projectService.Startup(ctx)
			calendarService.Startup(ctx)
		},
		Bind: []interface{}{
			app,
			authService,
			userService,
			taskService,
			projectService,
			calendarService,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
