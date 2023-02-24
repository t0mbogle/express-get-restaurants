const express = require("express");
const {Restaurant} = require("../models/index");
const restaurantRouter = express.Router();

// reading
restaurantRouter.get("/", async (req, res) => {
    const myRestaurants = await Restaurant.findAll();
    res.json(myRestaurants);
})

restaurantRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
})


// creating
restaurantRouter.post("/", async (req, res) => {
    try {
        const newRes = await Restaurant.create(req.body);
        if (!newRes) {
            throw new Error("No restaurant data added");
        }
        res.status(201).send({ msg: "Success", newRes });
    } catch (error) {
        res.status(500).send({ err: error.message });
    }
})


// updating
restaurantRouter.put("/:id", async (req, res) => {
    try {
        const updateRes = await Restaurant.update({
            name: req.body.name,
            location: req.body.location,
            cuisine: req.body.cuisine
        }, { 
            where: { 
                id: req.params.id 
            }
        });
        res.status(200).send({ msg: "Restaurant updated", updateRes });
    } catch (error) {
        res.status(500).send({ err: error.message });
    }
})


// deleting
restaurantRouter.delete('/:id', async (req, res) => {
    await Restaurant.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
})

module.exports = restaurantRouter;