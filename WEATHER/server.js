// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));
// Cors for cross origin allowance
app.use(cors());


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
//This function will run when we execute the listen method to let you know that the server is running and on which port by logging messages to the console.
function listening(){
  console.log(`server running on localhost: ${port}`);
}

app.get('/all', function (req, res) {
  res.send(projectData);
});

app.post('/add', function (req, res) {
  userEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
  
  projectData.push(userEntry);
});