const express = require("express") 
const cors = require("cors");
const footwearControllers = require("./controllers/footwearcontroller.js")
//CONFIGURATION
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to the Footwear App!")
});

app.use("/footwears", footwearControllers);

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
})

module.exports = app;