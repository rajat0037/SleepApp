const express = require("express")
const router = express.Router()

const {
    updateProfile
} = require("../controllers/Profile")

router.put("/updateProfile",  updateProfile)

module.exports = router