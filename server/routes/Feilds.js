const express = require("express");
const router = express.Router();
const {
    createFeild,
    getFeildsBySession,
    updateFeilds,
    deleteFeild
} = require("../controllers/Feilds");

// define routes
router.post('/createFeild',createFeild);
router.get('/getFeildsBySession/:sessionId', getFeildsBySession);
router.put('/updateFeilds/:feildId', updateFeilds);
router.delete('/deleteFeild/:feildId', deleteFeild);

module.exports = router;