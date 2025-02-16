package controllers

import (
	"net/http"
	"to-do-app/models/request"
	"to-do-app/models/response"

	"github.com/gin-gonic/gin"
)

func (c *AppController) CreateTask(ctx *gin.Context) {
	var req request.CreateTaskRequest

	userID, exists := ctx.Get("userID")
	if !exists {
		ctx.IndentedJSON(http.StatusUnauthorized, response.DefaultResponse{
			Message: "Unauthorized",
		})
		return
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, response.DefaultResponse{
			Detail:  err.Error(),
			Message: "Invalid request body",
		})
		return
	}

	req.UserId = userID.(int)

	res, status := c.AppService.CreateTask(ctx, req)
	ctx.IndentedJSON(status, res)
}

func (c *AppController) GetAllTasks(ctx *gin.Context) {
	userID, exists := ctx.Get("userID")
	if !exists {
		ctx.IndentedJSON(http.StatusUnauthorized, response.DefaultResponse{
			Message: "Unauthorized",
		})
		return
	}

	res, status := c.AppService.GetAllTasks(ctx, userID.(int))
	ctx.IndentedJSON(status, res)
}

func (c *AppController) MarkTaskDone(ctx *gin.Context) {
	taskID := ctx.Param("id")

	res, status := c.AppService.MarkTaskDone(ctx, taskID)
	ctx.IndentedJSON(status, res)
}

func (c *AppController) DeleteTask(ctx *gin.Context) {
	taskID := ctx.Param("id")

	res, status := c.AppService.DeleteTask(ctx, taskID)
	ctx.IndentedJSON(status, res)
}
