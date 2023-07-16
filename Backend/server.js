const express= require('express');
const cors=require('cors');
const mongoose= require('mongoose');

require('dotenv').config();

// to create the express server
const app=express();
const port= process.env.port || 5000;

app.use(cors());
app.use(express.json());

// to connect the server to the mongodb database

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// accessing the users and exercises
const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/user');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port,()=>{
    console.log(`Server is running on Port : ${port}`);
});