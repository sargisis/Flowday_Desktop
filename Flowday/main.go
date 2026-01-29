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
		},
		Bind: []interface{}{
			app,
			authService,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
