import express from 'express';
import mongoose from 'mongoose';
const PORT = 3000;
import routes from './Routes/userRouts.js'
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Features
// User Registration
// User Login
// Password Hashing (bcrypt)
// JWT Authentication
// Cookies
// Logout
// Protected Profile Route
// APIs
// POST /register done 
// POST /login   panding
// POST /logout  panding
// GET  /profile panding

function connectingDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/learningAuth")
    .then(() => {
      console.log("Mongoose connected");
    })
    .catch((err) => {
      console.log(err);
    });
}
connectingDB();
app.use("/api",routes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

});