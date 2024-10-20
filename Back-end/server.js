const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join("/home/ubuntu/daily-tasks/Front-end/build")));

// Handle GET requests to /api/* and send to API
app.get("*", (req, res) => {
  res.sendFile(path.join("/home/ubuntu/daily-tasks/Front-end/build"));
});

mongoose
  .connect(
    "mongodb+srv://yousefKamaldb:yoyoENZO1075@cluster0.qje8a.mongodb.net/tasksDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", taskRoutes);
app.use("/api", userRoutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
