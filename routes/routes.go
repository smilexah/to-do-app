package routes

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"to-do-app/config"
	"to-do-app/controllers"
	"to-do-app/internal/storage/DatabaseService"
	"to-do-app/internal/token"
	middleware "to-do-app/middlewares"
	"to-do-app/services"
)

func SetupRoutes(config *config.Config, db *sql.DB) *gin.Engine {
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	databaseService := DatabaseService.NewDBService(db)
	jwtService := token.NewJWTService(config)

	appService := services.NewAppService(databaseService, jwtService)
	appController := controllers.NewController(appService)

	router.Static("uploads", "./uploads")

	authGroup := router.Group("/auth")
	{
		authGroup.POST("/login", appController.Login)
		authGroup.POST("/register", appController.Register)
		authGroup.POST("/refresh", appController.RefreshToken)
		authGroup.POST("/logout", appController.Logout)
		//authGroup.POST("/send-verify-code", appController.SendVerifyCode)
		//authGroup.POST("/verify-account", appController.VerifyAccount)
	}

	userGroup := router.Group("/user").Use(appService.RequireAuth)
	{
		userGroup.GET("/current", appController.Current)
	}

	taskGroup := router.Group("/tasks").Use(appService.RequireAuth)
	{
		taskGroup.POST("/create", appController.CreateTask)
		taskGroup.GET("/all", appController.GetAllTasks)
		taskGroup.PUT("/done/:id", appController.MarkTaskDone)
		taskGroup.DELETE("/delete/:id", appController.DeleteTask)
	}

	return router
}
