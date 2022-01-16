const { response } = require('express');
const DonacionesPublicas = require('../models/donacionespublicas');
const Donaciones = {};


Donaciones.getTotal = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ donaciones, total ] = await Promise.all([
        DonacionesPublicas
            .find({}, 'nombres')
            .populate('usuario','nombre img')
            .skip( desde )
            .limit( 5 ),            
            DonacionesPublicas.countDocuments()
    ]);
    res.json({
        ok: true,
        donaciones,
        total
    });

}

Donaciones.get = async (req, res = response) => {
    const donaciones = await DonacionesPublicas.find()
                                .populate('usuario','nombre img')
    res.json({      
        donaciones
    })
}
Donaciones.getforUser = async (req, res = response) => {
    const donaciones = await DonacionesPublicas.find({'usuario': _id})
                                .populate('usuario','nombre img')
    res.json({      
        donaciones
    })
}
Donaciones.getById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const donaciones = await DonacionesPublicas.findById(id)
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

Donaciones.Crear = async (req, res = response) => {
    const uid = req.uid;
    const donaciones = new DonacionesPublicas({
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
Donaciones.actualizarUser = async(req, res = response) => {    
    const id  = req.params.id;
    const uid = req.uid;
    try {        
        const donaciones = await DonacionesPublicas.findById( id );
        if ( !donaciones ) {
            return res.status(404).json({               
                msg: 'Donacion no encontrada',
            });
        }
        const donacionesDonacionesPublicas = {
            ...req.body,
            usuario: uid
        }
        const donacionesActualizado = await DonacionesPublicas.findAndModify( id, donacionesDonacionesPublicas, { new: true } );
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

Donaciones.deleteUser = async (req, res = response) => {   
    const id  = req.params.id;
    try {        
        const donaciones = await DonacionesPublicas.findById( id );

        if ( !donaciones ) {
            return res.status(404).json({           
                msg: 'Donacion no encontrada',
            });
        }

        await DonacionesPublicas.findByIdAndDelete( id );
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



module.exports = Donaciones