const express = require('express');
const router = express.Router();

const {
    seedActivities,
    createActivity,
    getActivitiesByField,
    updateActivity,
    deleteActivity
} = require("../controllers/activitiesToImproveMentalHealth");

router.post('/createActivity',createActivity);
router.get("/getActivitiesByField/field/:fieldId",getActivitiesByField);
router.put('/updateActivity/:id',updateActivity);
router.delete("/deleteActivity/:id",deleteActivity);
router.post("/seed-activities",seedActivities);

module.exports = router;