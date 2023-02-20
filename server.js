const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (request, response) => {
    const myRestaurants = await Restaurant.findAll();
    response.json(myRestaurants);
})

app.get("/restaurants/:id", async (request, response) => {
    const id = request.params.id;
    const restaurant = await Restaurant.findByPk(id);
    response.send(restaurant);
})

app.post("/restaurants", async (request, response) => {
    const { name, location, cuisine } = request.body;
    const addRestaurant = await Restaurant.create({
        name,
        location,
        cuisine
    })
    // const insert = await Restaurant.push(addRestaurant);
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})