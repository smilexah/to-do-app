package models

import "time"

type Task struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id"`
	Title     string    `json:"title"`
	Status    bool      `json:"status" gorm:"default:false"`
	Priority  int       `json:"priority" gorm:"default:1;check:priority >= 1 AND priority <= 3"`
	DueDate   time.Time `json:"due_date"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
}
