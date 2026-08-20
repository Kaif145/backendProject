import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const PORT = 3000;
import routes from './Routes/userRouts.js'
const app = express();

import dotenv from "dotenv";

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());


// Features
// User Registration  done
// User Login done
// Password Hashing (bcrypt) done
// JWT Authentication done
// Cookies done
// Logout done
// Protected Profile Route done
// APIs done
// POST /register done 
// POST /login   done
// POST /logout  done
// GET  /profile done

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