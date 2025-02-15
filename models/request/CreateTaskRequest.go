package request

import "time"

type CreateTaskRequest struct {
	Title    string    `json:"title" binding:"required"`                 // Task title (required)
	Priority int       `json:"priority" binding:"omitempty,min=1,max=3"` // Priority (1 to 3, optional)
	DueDate  time.Time `json:"due_date" binding:"omitempty"`             // Optional due date
}
