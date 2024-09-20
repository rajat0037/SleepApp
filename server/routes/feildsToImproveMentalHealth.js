const express = require('express');
const router = express.Router();
const {
    createFieldToImproveMentalHealth,
    getAllFieldsToImproveMentalHealth,
    getFieldByIdToImproveMentalHealth,
    // updateFieldToImproveMentalHealth,
    deleteFieldToImproveMentalHealth
} = require("../controllers/feildsToImproveMentalHealth");

router.post('/createFieldToImproveMentalHealth',createFieldToImproveMentalHealth);
router.get('/getAllFieldsToImproveMentalHealth',getAllFieldsToImproveMentalHealth);
router.get('/getFieldByIdToImproveMentalHealth/:id',getFieldByIdToImproveMentalHealth);
// router.put('/updateFieldToImproveMentalHealth/:id',updateFieldToImproveMentalHealth);
router.delete('/deleteFieldToImproveMentalHealth/:id', deleteFieldToImproveMentalHealth);

module.exports = router;