package DatabaseService

import (
	"database/sql"
	"errors"
	"to-do-app/models"
)

// CreateTask inserts a new task into the database
func (s *DBService) CreateTask(task *models.Task) error {
	query := `
		INSERT INTO tasks (user_id, title, status, priority, due_date) 
		VALUES ($1, $2, $3, $4, $5) 
		RETURNING id, created_at`

	err := s.DB.QueryRow(query, task.UserID, task.Title, task.Status, task.Priority, task.DueDate).
		Scan(&task.ID, &task.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

// GetTasksByUserID retrieves all tasks for a specific user
func (s *DBService) GetTasksByUserID(userID int) ([]models.Task, error) {
	query := `
		SELECT id, user_id, title, status, priority, due_date, created_at 
		FROM tasks 
		WHERE user_id = $1`

	rows, err := s.DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var task models.Task
		if err := rows.Scan(&task.ID, &task.UserID, &task.Title, &task.Status, &task.Priority, &task.DueDate, &task.CreatedAt); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}

// GetTaskByID retrieves a single task by its ID and user ID
func (s *DBService) GetTaskByID(taskID string, userID int) (*models.Task, error) {
	query := `
		SELECT id, user_id, title, status, priority, due_date, created_at 
		FROM tasks 
		WHERE id = $1 AND user_id = $2`

	var task models.Task
	err := s.DB.QueryRow(query, taskID, userID).
		Scan(&task.ID, &task.UserID, &task.Title, &task.Status, &task.Priority, &task.DueDate, &task.CreatedAt)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil // Task not found
		}
		return nil, err
	}

	return &task, nil
}

// UpdateTask updates task details in the database
func (s *DBService) UpdateTask(task *models.Task) error {
	query := `
		UPDATE tasks 
		SET title = $1, status = $2, priority = $3, due_date = $4 
		WHERE id = $5 AND user_id = $6`

	_, err := s.DB.Exec(query, task.Title, task.Status, task.Priority, task.DueDate, task.ID, task.UserID)
	return err
}

// DeleteTask deletes a task by ID and user ID
func (s *DBService) DeleteTask(taskID string, userID int) error {
	query := `DELETE FROM tasks WHERE id = $1 AND user_id = $2`
	_, err := s.DB.Exec(query, taskID, userID)
	return err
}
