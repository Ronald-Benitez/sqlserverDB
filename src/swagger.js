const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reserva de vuelos postgres API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Desarrollo",
      },
    ],
  },
  apis: ["index.js", "./src/routes/api/*.js"],
};

const specs = swaggerJsdoc(options);
console.log("Documentación generada en http://localhost:5000/api-docs");

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
