const express= require("express");
const cors= require("cors");
require("dotenv").config({path: "./config/.env"})
require("./config/db");
require("./models/user")
var body = require('body-parser')
var user= mongoose.model('User', UserSchema);

const app= express()
app.use(cors())
app.use(express.json())

//get
app.get('/user', (request, response) => {
    response.json(user);
  });
  
  //post
  app.post('/user', (request, response) => {
    const incomingUser = request.body;
  
    user.push(incomingUser);
  
    response.json(user);
  })

  //put
  app.put('/user/:id', (request, response) => {
    const userId = Number(request.params.id);
    const body = request.body;
    const user = user.find((account) => user.id === userId);
    const index = user.indexOf(user);
  
    if (!user) {
      response.status(500).send('user not found.');
    } else {
      const updatedUser = { ...user, ...body };
  
      user[index] = updatedUser;
  
      response.send(updatedUser);
    }
  });

  //delete
  app.delete('/user/:id', (request, response) => {
    const userId = Number(request.params.id);
    const newUser = user.filter((user) => user.id != userId);
  
    if (!newUser ){
      response.status(500).send('user not found.');
    } else {
      user = newUser;
      response.send(user);
    }
  });

const port = process.env.PORT;
app.listen(port , () => {
    console.log(`server is renning in ${port}....`)
})