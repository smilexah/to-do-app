package services

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"to-do-app/models/response"
)

func (s *AppService) RequireAuth(ctx *gin.Context) {
	authToken := ctx.GetHeader("Authorization")
	if authToken == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, response.DefaultResponse{
			Message: "Unauthorized",
			Detail:  "No Access Token provided",
		})
		return
	}

	if len(authToken) >= 7 && authToken[:7] == "Bearer " {
		authToken = authToken[7:]
	} else {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, response.DefaultResponse{
			Message: "Unauthorized",
			Detail:  "Invalid Authorization header format",
		})
		return
	}

	claims, err := s.JWTService.ValidateToken(authToken)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, response.DefaultResponse{
			Message: "Unauthorized",
			Detail:  "Invalid or expired token: " + err.Error(),
		})
		return
	}

	// ✅ Set the username and userID in the context
	ctx.Set("username", claims.Username)
	ctx.Set("userID", claims.UserId)

	// Debugging logs
	fmt.Println("RequireAuth: username =", claims.Username, "userID =", claims.UserId)

	ctx.Next()
}
