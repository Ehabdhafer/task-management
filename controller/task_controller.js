const { error } = require("console");
const { forms } = require("../models/task_model");

exports.addtask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority } = req.body;
    const newtask = new forms({
      title,
      description,
      due_date,
      status,
      priority,
    });
    await newtask.save();
    res
      .status(201)
      .json({ message: "New task has been stored", task: newtask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// -------------------------------------------------------------------------------------

exports.getalltasks = async (req, res) => {
  try {
    const alltasks = await forms.find({ is_deleted: false });
    res.json(alltasks);
  } catch (error) {
    console.error("Error finding database:", error);
    res.json({ message: "Error" });
  }
};

// -------------------------------------------------------------------------------------

exports.gettaskbyid = async (req, res) => {
  let id = req.params.id;
  forms
    .findById(id)
    .then((taskid) => {
      if (taskid) {
        res.json({ taskid });
      } else {
        res.json({ message: "task not exist" });
      }
    })
    .catch((err) => {
      error("error in server", err);
      res.json({ message: "Error in Server" });
    });
};

// --------------------------------------------------------------------------------------

exports.updatetaskstatus = async (req, res) => {
  try {
    const id = req.params.id;
    const updatetask = await forms.findByIdAndUpdate(
      id,
      { status: req.body.status },
      {
        new: true,
      }
    );
    if (updatetask) {
      res.json({ message: "Task updated successfully", updatetask });
    } else {
      res.json({ message: "task not found" });
    }
  } catch (error) {
    console.error("Error updating task", error);
    res.json({ message: "Error updating task" });
  }
};
// --------------------------------------------------------------------------------------

exports.updatetask = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, ...updateFields } = req.body;
    const updatetask = await Task.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (updatetask) {
      res.json({ message: "Task updated successfully", updatetask });
    } else {
      res.json({ message: "task not found" });
    }
  } catch (error) {
    console.error("Error updating task", error);
    res.json({ message: "Error updating task" });
  }
};

// ---------------------------------------------------------------------------------

exports.deletetask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedtask = await forms.findByIdAndUpdate(id, { is_deleted: true });
    if (deletedtask) {
      res.json({ message: "Task deleted successfully", deletedtask });
    } else {
      res.json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.json({ message: "Error deleting task" });
  }
};
