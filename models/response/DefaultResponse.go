package response

type DefaultResponse struct {
	Message string `json:"message"`
	Detail  string `json:"detail"`
	Success bool   `json:"success" `
}

type Response struct {
	Result  interface{} `json:"result,omitempty"`
	Message string      `json:"message,omitempty"`
	Error   string      `json:"error,omitempty"`
}
