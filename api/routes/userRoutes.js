const express = require('express');
const router = express.Router();
const { getUser, addUser, editUser, deleteUser } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');


// Define routes
router.get('/', authenticateJWT, getUser);
router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;
