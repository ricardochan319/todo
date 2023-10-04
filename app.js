const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Define tasks array with completion status
const tasks = [];
const workTasks = []; // Add this line to define the workTasks array

// Route for the home page
app.get("/", (req, res) => {
  // Get the current date in the desired format
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  // Render the "index" template, passing tasks and currentDate as variables
  res.render("index", { tasks, currentDate });
});

// Route for Work Tasks
app.get("/workTasks", (req, res) => {
  // Get the current date in the desired format
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  // Render the "workTasks" template, passing workTasks and currentDate as variables
  res.render("workTasks", { workTasks, currentDate });
});

// Route to handle task creation for Work Tasks
app.post("/workTasks", (req, res) => {
  const taskText = req.body.task;
  const workTask = { task: taskText, completed: false };
  workTasks.push(workTask);
  res.redirect("/workTasks");
});

// Route to handle task completion toggle for Work Tasks
app.post("/workTasks/complete/:index", (req, res) => {
  const index = req.params.index;
  if (workTasks[index]) {
    workTasks[index].completed = !workTasks[index].completed;
  }
  res.sendStatus(200); // Respond with a success status
});

// Route to handle task creation for Today's Tasks
app.post("/", (req, res) => {
  const taskText = req.body.task;
  const task = { task: taskText, completed: false };
  tasks.push(task);
  res.redirect("/");
});

// Route to handle task completion toggle for Today's Tasks
app.post("/complete/:index", (req, res) => {
  const index = req.params.index;
  if (tasks[index]) {
    tasks[index].completed = !tasks[index].completed;
  }
  res.sendStatus(200); // Respond with a success status
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
