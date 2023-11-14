const express = require("express");
const router = express.Router();

const taskController = require("../controller/task_controller");

router.post("/addtask", taskController.addtask);
router.get("/getalltasks", taskController.getalltasks);
router.get("/gettaskid/:id", taskController.gettaskbyid);
router.put("/updatetaskstatus/:id", taskController.updatetaskstatus);
router.put("/updatetask/:id", taskController.updatetask);
router.put("/deletetask/:id", taskController.deletetask);

module.exports = router;
