package models

import "time"

type User struct {
	ID           uint      `gorm:"primaryKey"`
	Username     string    `gorm:"unique"`
	PasswordHash string    `json:"password_hash"`
	CreatedAt    time.Time `gorm:"autoCreateTime"`
}
