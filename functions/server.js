const express = require("express");
require("./db");
const cors = require("cors");
const Leave = require("./leaveSchema");
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define the GET endpoint for fetching leave history
app.get("/leave-history", async (req, res) => {
  try {
    const leaveHistory = await Leave.find();
    res.json(leaveHistory);
  } catch (error) {
    console.error('Error fetching leave history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/submit", async (req, res) => {
  const leave = new Leave({
    employeeName: req.body.employeeName,
    leaveType: req.body.leaveType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    leaveDuration: req.body.leaveDuration,
    approvalStatus: req.body.approvalStatus,
    comments: req.body.comments,
  });
  try {
    await leave.save();
    res.send("Leave application submitted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(5555, () =>
  console.log("Server is running on http://localhost:5555")
);
