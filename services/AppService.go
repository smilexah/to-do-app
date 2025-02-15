package services

import (
	"to-do-app/internal/storage/DatabaseService"
	"to-do-app/internal/token"
)

type AppService struct {
	DBService  *DatabaseService.DBService
	JWTService *token.JWTService
}

func NewAppService(dbService *DatabaseService.DBService, jwtService *token.JWTService) *AppService {
	return &AppService{
		DBService:  dbService,
		JWTService: jwtService,
	}
}
