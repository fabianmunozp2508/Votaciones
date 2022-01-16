const { response } = require('express');
const Rendimientoinver = require('../models/rendiminetosinver');
const Rendimiento = {};


Rendimiento.getTotal = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ rendimiento, total ] = await Promise.all([
        Rendimientoinver
            .find({}, 'nombres')
            .populate('usuario','nombre img')
            .skip( desde )
            .limit( 5 ),            
            Rendimientoinver.countDocuments()
    ]);
    res.json({
        ok: true,
        rendimiento,
        total
    });

}

Rendimiento.get = async (req, res = response) => {
    const rendimiento = await Rendimientoinver.find()
                                .populate('usuario','nombre img')
    res.json({      
        rendimiento
    })
}
Rendimiento.getforUser = async (req, res = response) => {
    const rendimientos = await Rendimientoinver.find({'usuario': _id})
                                .populate('usuario','nombre img')
    res.json({      
        rendimientos
    })
}
Rendimiento.getById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const rendimientos = await Rendimientoinver.findById(id)
                                    .populate('usuario','nombre img')                                  
        res.json({           
            rendimientos
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Rendimiento.Crear = async (req, res = response) => {
    const uid = req.uid;
    const rendimiento = new Rendimientoinver({
        usuario: uid,
        ...req.body
    });
    try {
        const rendimientoDB = await rendimiento.save();        
        res.json({
            ok: true,
            rendimiento: rendimientoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
Rendimiento.actualizarUser = async(req, res = response) => {    
    const id  = req.params.id;
    const uid = req.uid;
    try {        
        const rendimiento = await Rendimientoinver.findById( id );
        if ( !rendimiento ) {
            return res.status(404).json({               
                msg: 'Donacion no encontrada',
            });
        }
        const rendimientoRendimiento = {
            ...req.body,
            usuario: uid
        }
        const rendimientoActualizado = await Rendimientoinver.findAndModify( id, rendimientoRendimiento, { new: true } );
        res.json({
            rendimiento: rendimientoActualizado
        })
    } catch (error) { 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Rendimiento.deleteUser = async (req, res = response) => {   
    const id  = req.params.id;
    try {        
        const rendimiento = await Rendimientoinver.findById( id );

        if ( !rendimiento ) {
            return res.status(404).json({           
                msg: 'Donacion no encontrada',
            });
        }

        await Rendimientoinver.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Donacion no encontrada'
        }); 

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = Rendimiento