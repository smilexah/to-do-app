package response

import (
	"to-do-app/models"
)

type CurrentUserResponse struct {
	User *models.User `json:"user"`
}
