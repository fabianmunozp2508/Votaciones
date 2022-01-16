const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Donaciones = require('../controllers/donacionesprivadas')
const router = Router();

router.get( '/', validarJWT,Donaciones.get );
router.get( '/total', validarJWT,Donaciones.getTotal);
router.get( '/:id', validarJWT,Donaciones.getById);
router.get( '/usuario', validarJWT,Donaciones.getforUser );
router.post( '/',[validarJWT,validarCampos],Donaciones.Crear);
router.put( '/:id',[validarJWT,validarCampos],Donaciones.actualizarUser);
router.delete( '/:id',validarJWT,Donaciones.deleteUser);

module.exports = router;

