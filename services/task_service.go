package services

import (
	"net/http"
	"to-do-app/models"
	"to-do-app/models/request"
	"to-do-app/models/response"

	"github.com/gin-gonic/gin"
)

func (s *AppService) CreateTask(ctx *gin.Context, req request.CreateTaskRequest) (*response.Response, int) {
	userID, exists := ctx.Get("userID")
	if !exists {
		return &response.Response{
			Error: "Unauthorized",
		}, http.StatusUnauthorized
	}

	task := models.Task{
		Title:    req.Title,
		Status:   false,
		Priority: req.Priority,
		DueDate:  req.DueDate,
		UserID:   uint(userID.(int)),
	}

	if err := s.DBService.CreateTask(&task); err != nil {
		return &response.Response{
			Error: "Failed to create task",
		}, http.StatusInternalServerError
	}

	return &response.Response{
		Result:  task,
		Message: "Task created successfully",
	}, http.StatusCreated
}

func (s *AppService) GetAllTasks(ctx *gin.Context, userID int) (*response.Response, int) {
	tasks, err := s.DBService.GetTasksByUserID(userID)
	if err != nil {
		return &response.Response{
			Message: "Failed to fetch tasks",
			Error:   err.Error(),
		}, http.StatusInternalServerError
	}

	return &response.Response{
		Result: tasks,
	}, http.StatusOK
}

// MarkTaskDone updates a task's status to "done"
func (s *AppService) MarkTaskDone(ctx *gin.Context, taskID string) (*response.Response, int) {
	userID, exists := ctx.Get("userID")
	if !exists {
		return &response.Response{
			Error: "Unauthorized",
		}, http.StatusUnauthorized
	}

	task, err := s.DBService.GetTaskByID(taskID, userID.(int))
	if err != nil {
		return &response.Response{
			Error: "Task not found",
		}, http.StatusNotFound
	}

	task.Status = true

	if err := s.DBService.UpdateTask(task); err != nil {
		return &response.Response{
			Error: "Failed to update task",
		}, http.StatusInternalServerError
	}

	return &response.Response{
		Result:  task,
		Message: "Task marked as done",
	}, http.StatusOK
}

// DeleteTask deletes a task for the authenticated user
func (s *AppService) DeleteTask(ctx *gin.Context, taskID string) (*response.Response, int) {
	userID, exists := ctx.Get("userID")
	if !exists {
		return &response.Response{
			Error: "Unauthorized",
		}, http.StatusUnauthorized
	}

	err := s.DBService.DeleteTask(taskID, userID.(int))
	if err != nil {
		return &response.Response{
			Error: "Failed to delete task",
		}, http.StatusInternalServerError
	}

	return &response.Response{
		Message: "Task deleted successfully",
	}, http.StatusOK
}
