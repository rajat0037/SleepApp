const express = require("express");
const router = express.Router();

const {
    createSourceOfStress,
    getAllSourceOfStress,
    updateSourceOfStress,
    deleteSourceOfStress
} = require("../controllers/SourceOfStress");

router.post("/createSourceOfStress", createSourceOfStress);
router.get("/getAllSourceOfStress/:userId", getAllSourceOfStress);
router.put("/updateSourceOfStress/:sourceOfStressId", updateSourceOfStress);
router.delete("/deleteSourceOfStress/:sourceOfStressId",deleteSourceOfStress);

module.exports = router;