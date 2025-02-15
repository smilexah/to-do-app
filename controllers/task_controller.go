package controllers

import (
	"net/http"
	"to-do-app/models/request"
	"to-do-app/models/response"

	"github.com/gin-gonic/gin"
)

func (c *AppController) CreateTask(ctx *gin.Context) {
	var req request.CreateTaskRequest

	// Validate request body
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, response.DefaultResponse{
			Detail:  err.Error(),
			Message: "Invalid request body",
		})
		return
	}

	res, status := c.AppService.CreateTask(ctx, req)
	ctx.IndentedJSON(status, res)
}

func (c *AppController) GetAllTasks(ctx *gin.Context) {
	res, status := c.AppService.GetAllTasks(ctx)
	ctx.IndentedJSON(status, res)
}

func (c *AppController) MarkTaskDone(ctx *gin.Context) {
	taskID := ctx.Param("id")

	// Call service layer to update task status
	res, status := c.AppService.MarkTaskDone(ctx, taskID)
	ctx.IndentedJSON(status, res)
}

func (c *AppController) DeleteTask(ctx *gin.Context) {
	taskID := ctx.Param("id")

	// Call service layer to delete task
	res, status := c.AppService.DeleteTask(ctx, taskID)
	ctx.IndentedJSON(status, res)
}
