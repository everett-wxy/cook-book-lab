const express = require('express');
const router = express.Router();
const { viewAllUsers, viewUserId} = require('../controllers/user');

router.get('/', viewAllUsers);
router.get('/:id', viewUserId);

module.exports = router;