package main

import (
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	"log"
	"net/http"
	"to-do-app/config"
	"to-do-app/internal/storage"
	"to-do-app/routes"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Load config
	cfg := config.LoadConfig()
	log.Println("Config Loaded: ", cfg)

	// Connect to Postgres
	db, err := storage.InitDB(cfg)
	if err != nil {
		log.Println("Error when connecting to the database:", err)
		return
	}
	defer db.Close()

	// Setup routes
	router := routes.SetupRoutes(cfg, db)

	go func() {
		log.Println("Starting HTTP Server on port", cfg.ServerPort)
		if err := http.ListenAndServe(":"+cfg.ServerPort, router); err != nil {
			log.Println("Error starting the server:", err)
		}
	}()

	// Start Wails application
	appErr := wails.Run(&options.App{
		Title:             "To-Do",
		Width:             1024,
		Height:            768,
		MinWidth:          1024,
		MinHeight:         768,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
		Assets:            assets,
		Menu:              nil,
		Logger:            nil,
		LogLevel:          logger.DEBUG,
		OnStartup:         app.startup,
		OnDomReady:        app.domReady,
		OnBeforeClose:     app.beforeClose,
		OnShutdown:        app.shutdown,
		WindowStartState:  options.Normal,
		Bind: []interface{}{
			app,
		},
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
			WebviewUserDataPath:  "",
		},
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: true,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			Appearance:           mac.NSAppearanceNameDarkAqua,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "To-Do",
				Message: "",
				Icon:    nil,
			},
		},
	})

	if appErr != nil {
		log.Println("Wails application error:", appErr)
	}
}
