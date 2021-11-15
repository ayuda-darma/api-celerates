const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const templateRoute = require("./src/routes/template");
const path = require("path");

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Telkom",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http//localhost:9000"
            }
        ]
    },
    apis: [
        `${path.join(__dirname, "./routes/*.js")}`
    ]
}

// settings
const app = express();
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// middlewares
app.use(express.json());
app.use("/api", templateRoute);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));