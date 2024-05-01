const express = require("express");
require("./db");
const cors = require("cors");
const serverless = require("serverless-http");
const Leave = require("./leaveSchema");

const app = express();
const router = express.Router();
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define the GET endpoint for fetching leave history
router.get("/leave-history", async (req, res) => {
  try {
    const leaveHistory = await Leave.find();
    res.json(leaveHistory);
  } catch (error) {
    console.error('Error fetching leave history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/submit", async (req, res) => {
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

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/.netlify/functions/server", router);
// module.exports.handler = serverless(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
