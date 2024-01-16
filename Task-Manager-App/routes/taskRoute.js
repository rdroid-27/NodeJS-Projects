const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const Task = require("../models/tasks");

router.get("/test", auth, (req, res) => {
  res.json({
    message: "Task routes are working",
    user: req.user,
  });
});

// CRUD tasks

// create a task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).json({
      task,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});

// Get user tasks
router.get("/getTask", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });
    res.status(500).json({
      tasks,
      count: tasks.length,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

// fetch task by id
router.get("/getTask/:id", auth, async (req, res) => {
  const taskid = await req.params.id;
  try {
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "No such task found" });
    }

    res.status(200).json({ task, message: "Task fetched successfully" });
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

// updated task by id--- description and completed
router.put("/getTask/:id", auth, async (req, res) => {
  const taskid = await req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "No such task found" });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).json({ task, message: "Task Updated successfully" });
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

// delete a task by its id
router.delete("/getTask/:id", auth, async (req, res) => {
  const taskid = await req.params.id;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskid,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "No such task found" });
    }
    res.status(200).json({ task, message: "Task Deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
