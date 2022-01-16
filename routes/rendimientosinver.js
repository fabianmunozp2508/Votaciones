const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Rendimiento = require('../controllers/rendimiento')
const router = Router();

router.get( '/', validarJWT,Rendimiento.get );
router.get( '/total', validarJWT,Rendimiento.getTotal);
router.get( '/:id', validarJWT,Rendimiento.getById);
router.get( '/usuario', validarJWT,Rendimiento.getforUser );
router.post( '/',[validarJWT,validarCampos],Rendimiento.Crear);
router.put( '/:id',[validarJWT,validarCampos],Rendimiento.actualizarUser);
router.delete( '/:id',validarJWT,Rendimiento.deleteUser);

module.exports = router;

