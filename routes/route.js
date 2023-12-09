const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.post('/labharthi/registration', controller.labharthiRegistration);
router.get('/labharthi/view', controller.labharthiView);
router.patch('/labharthi/edit/:id', controller.labharthiEdit);
router.delete('/labharthi/delete/:id', controller.labharthiDelete);
module.exports = router;