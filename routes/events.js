//Obtener eventos
const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas tendrán que pasar por la validación del JWT
router.use(validarJWT);

router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
