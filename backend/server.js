const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Set up default mongoose connection
const uri = process.env.ATLAS_URI;
var options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

};

mongoose.connect(uri, options)


const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully")
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.get("/", (req, res) => {
  res.json({connect:'success'})
});

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter) 


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

