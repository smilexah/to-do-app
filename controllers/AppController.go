package controllers

import (
	"to-do-app/services"
)

type AppController struct {
	AppService *services.AppService
}

//type AppController struct {
//	DB *sql.DB
//}

//func NewAppController(db *sql.DB) *AppController {
//	return &AppController{DB: db}
//}

func NewController(appService *services.AppService) *AppController {
	return &AppController{AppService: appService}
}
