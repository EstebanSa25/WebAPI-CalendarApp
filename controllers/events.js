const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    let eventos = await Evento.find().populate('user', 'name');
    res.json({
        ok: true,
        msg: 'getEventos',
        eventos,
    });
};

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            });
        }
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }
        const nuevoEvento = {
            ...req.body,
            user: req.uid,
        };
        const eventoActualizado = await Evento.findByIdAndUpdate(
            eventoId,
            nuevoEvento,
            { new: true }
        );
        res.json({
            ok: true,
            evento: eventoActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const evento = await Evento.findById(eventoId);
    try {
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            });
        }
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de borrar este evento',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
    const elementoEliminado = await Evento.findByIdAndDelete(eventoId);
    res.json({
        ok: true,
        msg: 'Evento eliminado',
    });
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
};
