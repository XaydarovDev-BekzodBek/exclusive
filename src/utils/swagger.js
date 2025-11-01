const SwaggerJsDoc = require("swagger-jsdoc");
const SwaggerUi = require("swagger-ui-express");

const SwaggerSpec = SwaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express api with Swagger for exclusive",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
});

exports.setUpSwagger = (app) => {
  app.use("/api/documentation", SwaggerUi.serve, SwaggerUi.setup(SwaggerSpec));
};
