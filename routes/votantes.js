const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Votos = require('../controllers/votantes')
const router = Router();

router.get( '/', validarJWT,Votos.get );
router.get( '/total', validarJWT,Votos.getTotal);
router.get( '/:id', validarJWT,Votos.getById);
router.get( '/usuario', validarJWT,Votos.getforUser );
router.post( '/',[validarJWT,validarCampos],Votos.Crear);
router.put( '/:id',[validarJWT,validarCampos],Votos.actualizarUser);
router.delete( '/:id',validarJWT,Votos.deleteUser);

module.exports = router;

