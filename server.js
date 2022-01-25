// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// dependencies
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



// get routes and requests


app.get('/getData', getTemp)

function getTemp(req, res){
  res.send(projectData);
}


// post routes

app.post('/addData', addData);

function addData(req,res){

projectData['date'] = req.body.date;
projectData['temperature'] = req.body.temperature;
projectData['feelings'] = req.body.feelings;

res.send(projectData);
// console.log("The data pushed is "+newData)
}



/*
app.post('/data', addData);

function addData(req,res){

  NewInput = {
    temp :req.body.temp,
    content : req.body.content,
    date :req.body.date,
  };

  projectData.push(NewInput);
  //res.send({ success: true });
  res.send(  projectData);
  console.log(projectData);
}
*/
// Setup Server
const port = 3333;
const server = app.listen(port, listening);

//callback function
function listening(){
     console.log("server running");
     console.log(`running on localhost: ${port}`);
}
