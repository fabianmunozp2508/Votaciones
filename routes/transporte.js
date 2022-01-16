const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Transpo = require('../controllers/transporte')
const router = Router();

router.get( '/', validarJWT,Transpo.get );
router.get( '/total', validarJWT,Transpo.getTotal);
router.get( '/:id', validarJWT,Transpo.getById);
router.get( '/usuario', validarJWT,Transpo.getforUser );
router.post( '/',[validarJWT,validarCampos],Transpo.Crear);
router.put( '/:id',[validarJWT,validarCampos],Transpo.actualizarUser);
router.delete( '/:id',validarJWT,Transpo.deleteUser);

module.exports = router;

