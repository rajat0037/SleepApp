const express = require("express");
const router = express.Router();
const {
    createActivity,
    getAllActivitiesBySession,
    updateActivity,
    deleteActivity,
} = require("../controllers/Activity");

router.post("/createActivity", createActivity);
router.get("/getAllActivitiesBySession/:sessionId", getAllActivitiesBySession);
router.put("/updateActivity/:activityId", updateActivity);
router.delete("/deleteActivity/:activityId", deleteActivity);

module.exports = router;