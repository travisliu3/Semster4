// Setup
const express = require("express");
const path = require("path");
const cors = require("cors");

// const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

// Add support for incoming JSON entities
// app.use(bodyParser.json());
app.use(express.json()); // built-in body-parser

app.use(cors());

/**************************************************************************** */
//* webapi example v4: template of CRUD operations to an entity - item
/**************************************************************************** */

// Deliver the app's home page to browser clients
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// R - Get all
app.get("/api/items", (req, res) => { // for query string, e.g. ?page=2, you don't need to define it here but you can directly use it
  res.json({ message: "fetch all items", page: req.query.page, department: req.query.department });
});

// R - Get one
app.get("/api/items/:id", (req, res) => {
  res.json({ message: `get user with identifier: ${req.params.id}` });
});

// C - Add new
// This route expects a JSON object in the body, e.g. { "firstName": "Peter", "lastName": "McIntyre" }
app.post("/api/items", (req, res) => {
  // MUST return HTTP 201
  res.status(201).json({ message: `added a new item: ${req.body.firstName} ${req.body.lastName}` });
});

// U - Edit existing
// This route expects a JSON object in the body, 
// e.g. { "id": 123, "firstName": "Peter", "lastName": "McIntyre" } 
app.put("/api/items/:id", (req, res) => {
  res.json({ message: `updated item with identifier: ${req.params.id} to ${req.body.firstName} ${req.body.lastName}` });
});

// D - Delete item
app.delete("/api/items/:id", (req, res) => {
  res.status(200).json({ "message": `deleted user with identifier: ${req.params.id}` });
  // In a real app, do not send body data, instead just send...
  // res.status(204).end();
});

//* Note: 3 ways to pass data to server - see above routes 



/**************************************************************************** */
// CRUD operations to colors - an array.
/**************************************************************************** */
// Array of strings
var colours = [ 'Red', 'Green', 'Blue', 'Yellow', 'Aqua', 'Fuschia' ];

// Get all
app.get("/api/colors", (req, res) => { 
  res.json(colours);
});

// Get one
app.get("/api/colors/:id", (req, res) => {
  // Extract the item identifier
  let itemId = req.params.id;
  // Make sure it's valid 
  if (itemId > colours.length - 1) {
    res.status(404).send("Resource not found");
  } else {
    res.json(colours[itemId]);
  }

});

// Add new
// This route expects a JSON object in the body, e.g. { "colourName": "Purple" }
app.post("/api/colors", (req, res) => {
  // MUST return HTTP 201
  // Extract the incoming data from { "colourName": "Purple" }
  let newItem = req.body.colourName;
  // Add another item to the array
  colours.push(newItem);
  // Return the result; RFC 7231 tells us that it must return HTTP status 201
  // res.status(201).json({ message: `added ${newItem} as item identifier ${colours.length}` });
  res.status(201).json(newItem);
});

// Edit existing
// This route expects a JSON object in the body, e.g. { "colourName": "Golden" }
// Note: better not to put '"id":123' in body and check the if the 2 IDs match or not
app.put("/api/colors/:id", (req, res) => {
  // Extract the incoming data from { "colourName": "Golden" }
  let newColor = req.body.colourName;

  let colorId = req.params.id;
  // Make sure it's valid 
  if (colorId > colours.length - 1) {
    res.status(404).send("Resource not found");
  } else {
    colours[colorId] = newColor;
    res.json(colours[colorId]);
  }
});

// Delete item
app.delete("/api/colors/:id", (req, res) => {
  // Attempt to find the element
  if (req.params.id > colours.length - 1) {
    res.status(404).json({ "message": "Resource not found" });
  }
  else {
    colours.splice(req.params.id, 1);
    // MUST return HTTP 204
    res.status(204).end();
  }
});



/**************************************************************************** */
// CRUD operations to employees which is from employees.json.
/**************************************************************************** */
// Data model and "persistent store" setup for v6
const dataService = require("./data-service.js");  

// Get all
app.get("/api/employees", (req, res) => { // for query string, e.g. ?page=2, we don't need to define in the path
  let page = req.query.page ? req.query.page : 0;
  res.json(dataService.getAllEmployees(page));
});

// Get one
app.get("/api/employees/:id", (req, res) => {
  // let emp = dataService.getEmployeeById(req.params.id);
  // emp ? res.json(emp) : res.status(404).json({ "message": "Resource not found" });
  dataService.getEmployeeById(req.params.id)
  .then((emp) => {
    emp ? res.json(emp) : res.status(404).json({ "message": "Resource not found" });
  })
  .catch((err) => {
    res.status(500).json({ "message": "Server internal error" });
  });
});

// Add new
// This route expects a JSON object in the body, e.g. { "firstName": "Peter", "lastName": "McIntyre" }
app.post("/api/employees", (req, res) => {
  // MUST return HTTP 201
  res.status(201).json(dataService.AddNewEmployee(req.body));
});

// Edit existing
app.put("/api/employees/:id", (req, res) => {

if (req.body.employeeId && req.params.id != req.body.employeeId ) { 
  res.status(400).json({ "message": "IDs not match" });
}
else {
  // Call the employee method & Return the appropriate result
  let o = dataService.EditEmployee(req.body, req.params.id);
  o ? res.json(o) : res.status(404).json({ "message": "Resource not found" });
}

});

// Delete item
app.delete("/api/employees/:id", (req, res) => {
  dataService.deleteEmployee(req.params.id);
  // In a real app, do not send body data, instead just send...
  res.status(204).end();
});



// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
  console.log("Ready to handle requests on port " + HTTP_PORT);
});