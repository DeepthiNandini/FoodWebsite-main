const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConfig");
const PORT = process.env.PORT || 5000
const mealsRouter = require('./routes/mealRoutes');
const authRouter = require('./routes/authRoutes');
const {errorHandler, notFound} = require('./middlewares/errorHandler')
const cors = require("cors");

dbConnect();


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };

app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api/meals',cors(corsOptions), mealsRouter);
app.use('/api/user', authRouter);
app.use(notFound);
app.use(errorHandler);

app.listen( PORT, ()=>{
    console.log(`server started at port ${PORT}`);
})