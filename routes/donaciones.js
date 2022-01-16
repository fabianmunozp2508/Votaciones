const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Dona = require('../controllers/donaciones')
const router = Router();

router.get( '/', validarJWT,Dona.get );
router.get( '/total', validarJWT,Dona.getTotal);
router.get( '/:id', validarJWT,Dona.getById);
router.get( '/usuario', validarJWT,Dona.getforUser );
router.post( '/',[validarJWT,validarCampos],Dona.Crear);
router.put( '/:id',[validarJWT,validarCampos],Dona.actualizarUser);
router.delete( '/:id',validarJWT,Dona.deleteUser);

module.exports = router;

