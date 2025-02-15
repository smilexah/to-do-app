package services

import (
	"net/http"
	response2 "to-do-app/models/response"
)

func (s *AppService) CurrentUser(username string) (*response2.Response, int) {
	user, err := s.DBService.GetUserByUsername(username)
	if err != nil {
		return &response2.Response{
			Error: err.Error(),
		}, http.StatusInternalServerError
	}

	currentUserRes := &response2.CurrentUserResponse{
		User: user,
	}

	return &response2.Response{
		Result: currentUserRes,
	}, http.StatusOK
}
