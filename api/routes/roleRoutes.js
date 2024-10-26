const express = require('express');
const router = express.Router();
const { getRole, addRole, editRole, deleteRole } = require('../controllers/roleController');

// Define routes
router.get('/', getRole);
router.post('/', addRole);
router.put('/:id', editRole);
router.delete('/:id', deleteRole);

module.exports = router;
