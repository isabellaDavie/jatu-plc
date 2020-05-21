const express = require('express');

const router = express.Router();

const reportController = require('../controllers/report.controller');

const { authenticate } = require('../middlewares/authenticate')



router.get('', reportController.getAllReports)

router.get('/:reportID', reportController.getOneReport)

router.post('/create', reportController.create)

router.put('/update/:reportID', reportController.update)

router.put('/add-comment/:reportID', reportController.addComment)

router.put('/delete-comment/:reportID', reportController.removeComment)

router.delete('/delete/:reportID', reportController.delete)

module.exports = router