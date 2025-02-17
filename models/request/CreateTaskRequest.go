package request

import "time"

type CreateTaskRequest struct {
	UserId   int       `json:"user_id"`
	Title    string    `json:"title" binding:"required"`
	Priority int       `json:"priority" binding:"omitempty,min=1,max=3"`
	DueDate  time.Time `json:"due_date" binding:"omitempty"`
}
