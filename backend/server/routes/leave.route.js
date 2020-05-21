const express = require('express');

const router = express.Router();

const leaveController = require('../controllers/leave.controller');

const  authenticate  = require('../middlewares/authenticate')

router.get('', leaveController.getAllLeaveRequests)

router.get('/:leaveID', leaveController.getLeaveRequest)

router.post('/create', leaveController.create)

router.put('/update/:leaveID', leaveController.update)

router.put('/add-comment/:leaveID', leaveController.addComment)

router.put('/delete-comment/:leaveID', leaveController.removeComment)

router.delete('/delete/:leaveID', leaveController.delete)

module.exports = router