package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"to-do-app/models/response"
)

func (c *AppController) Current(ctx *gin.Context) {
	username := ctx.MustGet("username").(string)

	if username == "" {
		ctx.JSON(http.StatusBadRequest, response.DefaultResponse{
			Message: "Username not found",
			Detail:  "Username not found when try to get it from request",
		})
	}

	res, code := c.AppService.CurrentUser(username)

	ctx.IndentedJSON(code, res)
}
