const express = require('express');
const connetingDb = require("./config/connectingDB");

const studentRoutes = require("./Routes/studentRoutes");

const App = express();

App.use(express.urlencoded({ extended: true }));

App.use(express.json());
connetingDb();

App.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
App.use('/api',studentRoutes);


App.listen(3000, () => {

  console.log('Server is running on port 3000');

});
