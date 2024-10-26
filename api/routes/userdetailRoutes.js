const express = require('express');
const router = express.Router();
const { getuserdetail, adduserdetail, edituserdetail, deleteuserdetail } = require('../controllers/userdetailController');
const authenticateJWT = require('../middleware/authenticateJWT');


// Define routes
router.get('/',authenticateJWT, getuserdetail);
router.post('/', adduserdetail);
router.put('/:id', edituserdetail);
router.delete('/:id', deleteuserdetail);

module.exports = router;
