const express = require('express');
const router = express.Router();
const { getMaterial, addMaterial, editMaterial, deleteMaterial } = require('../controllers/materialController');
const authenticateJWT = require('../middleware/authenticateJWT');



// Define routes
router.get('/',authenticateJWT, getMaterial);
router.post('/', addMaterial);
router.put('/:id', editMaterial);
router.delete('/:id', deleteMaterial);

module.exports = router;
