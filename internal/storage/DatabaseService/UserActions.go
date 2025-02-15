package DatabaseService

import (
	"database/sql"
	"errors"
	"to-do-app/models"
)

func (s *DBService) GetUserByUsername(username string) (*models.User, error) {
	user := &models.User{}
	err := s.DB.QueryRow("SELECT id, username, password_hash, created_at FROM users WHERE username = $1", username).Scan(&user.ID, &user.Username, &user.PasswordHash, &user.CreatedAt)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return user, nil
}

func (s *DBService) IsUserExistByUsername(username string) (bool, error) {
	var userId int
	err := s.DB.QueryRow(
		"SELECT id FROM users WHERE username = $1",
		username,
	).Scan(&userId)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, nil // No user found
		}
		return false, err
	}
	return true, nil
}

func (s *DBService) CreateUser(user models.User) error {
	_, err := s.DB.Exec(
		"INSERT INTO users (username, password_hash) VALUES ($1, $2)",
		user.Username, user.PasswordHash,
	)
	if err != nil {
		return err
	}
	return nil
}

//ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
