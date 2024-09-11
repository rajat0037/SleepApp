const express = require("express");
const router = express.Router();

const {
    createSession,
    getSessionByUser,
    updateSession,
    deleteSession
} = require("../controllers/Session");

router.post('/createSession', createSession);
router.get('/getSessionByUser/:userId', getSessionByUser);
router.put('/updateSession/:sessionId', updateSession);
router.delete('/deleteSession/:sessionId', deleteSession);

module.exports = router;


