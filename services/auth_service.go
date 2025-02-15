package services

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"to-do-app/lib/hashing"
	"to-do-app/models"
	"to-do-app/models/request"
	response2 "to-do-app/models/response"
)

func (s *AppService) Login(username, password string) (*response2.Response, int, string) {
	user, err := s.DBService.GetUserByUsername(username)
	if err != nil {
		return &response2.Response{
			Error: err.Error(),
		}, http.StatusInternalServerError, ""
	}

	if user == nil {
		return &response2.Response{
			Error: "Incorrect Username or Password",
		}, http.StatusBadRequest, ""
	}

	if !hashing.CheckPassword(user.PasswordHash, password) {
		return &response2.Response{
			Error: "Incorrect Username or Password",
		}, http.StatusBadRequest, ""
	}

	token, err := s.JWTService.GenerateAccessToken(username, int(user.ID))
	if err != nil {
		return &response2.Response{
			Error: "Server Error when try to generate access token",
		}, http.StatusInternalServerError, ""
	}

	refreshToken, err := s.JWTService.GenerateRefreshToken(username)
	if err != nil {
		return &response2.Response{
			Error: err.Error(),
		}, http.StatusInternalServerError, ""
	}

	fmt.Println("login refreshToken", refreshToken)

	loginResponse := &response2.LoginResponse{
		Token: token,
	}
	return &response2.Response{
		Result:  loginResponse,
		Message: "Login Success",
	}, http.StatusOK, refreshToken
}

func (s *AppService) Register(request request.RegisterRequest) (*response2.Response, int) {
	// Check if user already exists
	isExistByUsername, err := s.DBService.IsUserExistByUsername(request.Username)
	if err != nil {
		return &response2.Response{
			Error: err.Error(),
		}, http.StatusInternalServerError
	}

	if isExistByUsername {
		return &response2.Response{
			Error: "User with this username already exists",
		}, http.StatusBadRequest
	}

	// Create user model
	newUser := models.User{
		Username:     request.Username,
		PasswordHash: hashPassword(request.Password),
	}

	// Save user to the database
	err = s.DBService.CreateUser(newUser)
	if err != nil {
		return &response2.Response{
			Error: "Failed to create user: " + err.Error(),
		}, http.StatusInternalServerError
	}

	return &response2.Response{
		Message: "User created successfully",
	}, http.StatusCreated
}

func hashPassword(password string) string {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword)
}

func (s *AppService) RefreshToken(refreshToken string) (*response2.Response, int, string) {
	claims, err := s.JWTService.ValidateToken(refreshToken)
	fmt.Println("refreshToken:", refreshToken)
	if err != nil {
		return &response2.Response{
			Error: fmt.Sprintf("failed to validate token: %w", err.Error()),
		}, http.StatusInternalServerError, ""
	}

	token, err := s.JWTService.GenerateAccessToken(claims.Username, claims.UserId)
	if err != nil {
		return &response2.Response{
			Error: fmt.Sprintf("failed to generate access token: %w", err.Error()),
		}, http.StatusInternalServerError, ""
	}
	newRefreshToken, err := s.JWTService.GenerateRefreshToken(claims.Username)
	if err != nil {
		return &response2.Response{
			Error: err.Error(),
		}, http.StatusInternalServerError, ""
	}

	loginRes := &response2.LoginResponse{
		Token: token,
	}
	return &response2.Response{
		Result: loginRes,
	}, http.StatusOK, newRefreshToken
}
