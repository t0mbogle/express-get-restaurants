const express = require("express");
const app = express();
const {sequelize} = require("./db");
const restaurantRouter = require("./routes/restaurantRouter");

const port = 3000;

app.use(express.json());

app.use('/restaurant', restaurantRouter);
app.use('/restaurant/:id', restaurantRouter);

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})