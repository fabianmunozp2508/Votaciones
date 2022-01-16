const { response } = require('express');
const Donaciones = require('../models/donaciones');
const Dona = {};


Dona.getTotal = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ donaciones, total ] = await Promise.all([
        Donaciones
            .find({}, 'nombres')
            .populate('usuario','nombre img')
            .skip( desde )
            .limit( 5 ),            
            Donaciones.countDocuments()
    ]);
    res.json({
        ok: true,
        donaciones,
        total
    });

}

Dona.get = async (req, res = response) => {
    const donaciones = await Donaciones.find()
                                .populate('usuario','nombre img')
    res.json({      
        donaciones
    })
}
Dona.getforUser = async (req, res = response) => {
    const donaciones = await Donaciones.find({'usuario': _id})
                                .populate('usuario','nombre img')
    res.json({      
        donaciones
    })
}
Dona.getById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const donaciones = await Donaciones.findById(id)
                                    .populate('usuario','nombre img')                                  
        res.json({           
            donaciones
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Dona.Crear = async (req, res = response) => {
    const uid = req.uid;
    const donaciones = new Donaciones({
        usuario: uid,
        ...req.body
    });
    try {
        const donacionesDB = await donaciones.save();        
        res.json({
            ok: true,
            donaciones: donacionesDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
Dona.actualizarUser = async(req, res = response) => {    
    const id  = req.params.id;
    const uid = req.uid;
    try {        
        const donaciones = await Donaciones.findById( id );
        if ( !donaciones ) {
            return res.status(404).json({               
                msg: 'Donacion no encontrada',
            });
        }
        const donacionesVotantes = {
            ...req.body,
            usuario: uid
        }
        const donacionesActualizado = await Votantes.findAndModify( id, donacionesVotantes, { new: true } );
        res.json({
            donaciones: donacionesActualizado
        })
    } catch (error) { 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Dona.deleteUser = async (req, res = response) => {   
    const id  = req.params.id;
    try {        
        const donaciones = await Donaciones.findById( id );

        if ( !donaciones ) {
            return res.status(404).json({           
                msg: 'Donacion no encontrada',
            });
        }

        await Donaciones.findByIdAndDelete( id );
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



module.exports = Dona