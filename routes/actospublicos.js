const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Actospublicos = require('../controllers/actospublicos')
const router = Router();

router.get( '/', validarJWT,Actospublicos.get );
router.get( '/total', validarJWT,Actospublicos.getTotal);
router.get( '/:id', validarJWT,Actospublicos.getById);
router.get( '/usuario', validarJWT,Actospublicos.getforUser );
router.post( '/',[validarJWT,validarCampos],Actospublicos.Crear);
router.put( '/:id',[validarJWT,validarCampos],Actospublicos.actualizarUser);
router.delete( '/:id',validarJWT,Actospublicos.deleteUser);

module.exports = router;

