const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.post('/labharthi/registration', controller.labharthiRegistration);
router.get('/labharthi/view', controller.labharthiView);
router.patch('/labharthi/edit/:id', controller.labharthiEdit);
router.delete('/labharthi/delete/:id', controller.labharthiDelete);

router.post('/donor/registration', controller.donorRegistration);
router.get('/donor/view', controller.donorView);
router.patch('/donor/edit/:id', controller.donorEdit);
router.delete('/donor/delete/:id', controller.donorDelete);
//
router.post('/other/registration', controller.otherRegistration);
router.get('/other/view', controller.otherView);
router.patch('/other/edit/:id', controller.otherEdit);
router.delete('/other/delete/:id', controller.otherDelete);

module.exports = router;