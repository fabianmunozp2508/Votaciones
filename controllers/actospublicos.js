const { response } = require('express');
const ActosPublicos = require('../models/actospublicos');
const ActosP = {};


ActosP.getTotal = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ actospublicos, total ] = await Promise.all([
        ActosPublicos
            .find({}, 'nombres')
            .populate('usuario','nombre img')
            .skip( desde )
            .limit( 5 ),            
            ActosPublicos.countDocuments()
    ]);
    res.json({
        ok: true,
        actospublicos,
        total
    });

}

ActosP.get = async (req, res = response) => {
    const actospublicos = await ActosPublicos.find()
                                .populate('usuario','nombre img')
    res.json({      
        actospublicos
    })
}
ActosP.getforUser = async (req, res = response) => {
    const actospublicos = await ActosPublicos.find({'usuario': _id})
                                .populate('usuario','nombre img')
    res.json({      
        actospublicos
    })
}
ActosP.getById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const actospublicos = await ActosPublicos.findById(id)
                                    .populate('usuario','nombre img')                                  
        res.json({           
            actospublicos
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

ActosP.Crear = async (req, res = response) => {
    const uid = req.uid;
    const actospublicos = new ActosPublicos({
        usuario: uid,
        ...req.body
    });
    try {
        const actospublicosDB = await actospublicos.save();        
        res.json({
            ok: true,
            actospublicos: actospublicosDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
ActosP.actualizarUser = async(req, res = response) => {    
    const id  = req.params.id;
    const uid = req.uid;
    try {        
        const actospublicos = await ActosPublicos.findById( id );
        if ( !actospublicos ) {
            return res.status(404).json({               
                msg: 'Acto no encontrada',
            });
        }
        const actospublicosVotantes = {
            ...req.body,
            usuario: uid
        }
        const actospublicosActualizado = await ActosPublicos.findAndModify( id, actospublicosVotantes, { new: true } );
        res.json({
            actospublicos: actospublicosActualizado
        })
    } catch (error) { 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

ActosP.deleteUser = async (req, res = response) => {   
    const id  = req.params.id;
    try {        
        const actospublicos = await ActosPublicos.findById( id );

        if ( !actospublicos ) {
            return res.status(404).json({           
                msg: 'actospublicos no encontrada',
            });
        }

        await ActosPublicos.findByIdAndDelete( id );
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

module.exports = ActosP