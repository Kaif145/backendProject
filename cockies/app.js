const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
  // Set a cookie named 'myCookie' with value 'Hello, World!' that expires in 1 hour
  res.cookie("myCookie", "Hello, World!", { maxAge: 3600000 }); // 1 hour in milliseconds
  res.send("Cookie has been set!");
});

let count = 0;

app.get("/incrementCounter", (req, res) => {
  try {
    count++;
    res.json({ message: `Counter incremented!`, count: count });
  } catch (err) {
    res.status(500).send("Error incrementing counter");
  }
});

app.get("/getCounter", (req, res) => {
  try {
    res.json({ message: `Count Information`, count: count });
  } catch (err) {
    res.status(500).send("Error retrieving counter");
  }
});
app.get("/decrementCounter", (req, res) => {
  try {
    if (count <= 0) {
      return res
        .status(400)
        .json({
          message: `Counter cannot be decremented below zero!`,
          count: count,
        });
    }
    count--;
    res.json({ message: `Counter decremented!`, count: count });
  } catch (err) {
    res.status(500).send("Error decrementing counter");
  }
});

app.get("/resetCounter", (req, res) => {
  try {
    count = 0;
    res.json({ message: `Counter reset!`, count: count });
  } catch (err) {
    res.status(500).send("Error resetting counter");
  }
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
