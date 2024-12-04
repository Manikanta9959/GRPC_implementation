const swaggerDoc = {
    openapi: "3.0.0",
    info: {
      title: "Calculator API",
      description: "API for performing basic arithmetic operations using gRPC.",
      contact: {
        name: "Calculator API Support",
        email: "your-email@example.com",
      },
      version: "1.0.0",
    },
    tags: [
      {
        name: "Calculator Operations",
        description: "Endpoints for basic arithmetic operations",
      },
    ],
    paths: {
      "/calculator/add": {
        post: {
          tags: ["Calculator Operations"],
          summary: "Add two numbers",
          description: "Performs addition of two numbers using gRPC.",
          operationId: "addNumbers",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    num1: {
                      type: "number",
                      description: "The first number",
                      example: 10,
                    },
                    num2: {
                      type: "number",
                      description: "The second number",
                      example: 5,
                    },
                  },
                  required: ["num1", "num2"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Addition successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "number",
                        example: 15,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error during addition",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "Error adding numbers",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/calculator/sub": {
        post: {
          tags: ["Calculator Operations"],
          summary: "Subtract two numbers",
          description: "Performs subtraction of two numbers using gRPC.",
          operationId: "subtractNumbers",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    num1: {
                      type: "number",
                      description: "The first number",
                      example: 10,
                    },
                    num2: {
                      type: "number",
                      description: "The second number",
                      example: 5,
                    },
                  },
                  required: ["num1", "num2"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Subtraction successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "number",
                        example: 5,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error during subtraction",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "Error subtracting numbers",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/calculator/multiply": {
        post: {
          tags: ["Calculator Operations"],
          summary: "Multiply two numbers",
          description: "Performs multiplication of two numbers using gRPC.",
          operationId: "multiplyNumbers",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    num1: {
                      type: "number",
                      description: "The first number",
                      example: 10,
                    },
                    num2: {
                      type: "number",
                      description: "The second number",
                      example: 5,
                    },
                  },
                  required: ["num1", "num2"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Multiplication successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "number",
                        example: 50,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error during multiplication",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "Error multiplying numbers",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/calculator/divide": {
        post: {
          tags: ["Calculator Operations"],
          summary: "Divide two numbers",
          description: "Performs division of two numbers using gRPC.",
          operationId: "divideNumbers",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    num1: {
                      type: "number",
                      description: "The first number",
                      example: 10,
                    },
                    num2: {
                      type: "number",
                      description: "The second number",
                      example: 2,
                    },
                  },
                  required: ["num1", "num2"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Division successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      result: {
                        type: "number",
                        example: 5,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Server error during division",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "Error dividing numbers",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  
  export default swaggerDoc;
  