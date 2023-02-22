const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

app.use(express.json());

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req, res) => {
    const myRestaurants = await Restaurant.findAll();
    res.json(myRestaurants);
})

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
})

//post
app.post("/restaurants", async (req, res) => {
    const { name, location, cuisine } = req.body;
    try {
        Restaurant.push(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send({ err: error.message })
    }
})

// update

// delete
app.delete('/restaurants/:id', async (req, res) => {
    await Restaurant.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})