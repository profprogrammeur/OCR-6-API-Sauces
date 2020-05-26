const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const { userValidationRules, validate } = require('../middleware/validatorSauce.js')


router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', userValidationRules(), validate,auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;