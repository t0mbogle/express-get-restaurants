const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (require, response) => {
    const myRestaurants = await Restaurant.findAll();
    response.json(myRestaurants);
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})