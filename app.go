package main

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	runtime.LogInfo(ctx, "App is starting...")

	// ✅ Execute JavaScript to clear localStorage
	runtime.WindowExecJS(ctx, "localStorage.clear(); console.log('localStorage cleared on app start');")
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
// func (a *App) Greet(name string) string {
// 	return fmt.Sprintf("Hello %s, It's show time!", name)
// }

// var newDB, err = database.NewJSONDatabase("db.json")

// func (a *App) Create(note database.Note) error {
// 	return newDB.Create(note)
// }

// func (a *App) Read(note database.Note) ([]database.Note, error) {
// 	return newDB.Read()
// }

// func (a *App) Update(id int, note database.Note) error {
// 	return newDB.Update(id, note)
// }

// func (a *App) Delete(id int) error {
// 	return newDB.Delete(id)
// }
