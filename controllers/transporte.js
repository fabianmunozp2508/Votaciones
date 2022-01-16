const { response } = require('express');
const Transporte = require('../models/trnasporte');
const Transpo = {};


Transpo.getTotal = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ transporte, total ] = await Promise.all([
        Transporte
            .find({}, 'nombres')
            .populate('usuario','nombre img')
            .skip( desde )
            .limit( 5 ),            
            Transporte.countDocuments()
    ]);
    res.json({
        ok: true,
        transporte,
        total
    });

}

Transpo.get = async (req, res = response) => {
    const transporte = await Transporte.find()
                                .populate('usuario','nombre img')
    res.json({      
        transporte
    })
}
Transpo.getforUser = async (req, res = response) => {
    const transporte = await Transporte.find({'usuario': _id})
                                .populate('usuario','nombre img')
    res.json({      
        transporte
    })
}
Transpo.getById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const transporte = await Transporte.findById(id)
                                    .populate('usuario','nombre img')                                  
        res.json({           
            transporte
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Transpo.Crear = async (req, res = response) => {
    const uid = req.uid;
    const transporte = new Transporte({
        usuario: uid,
        ...req.body
    });
    try {
        const transporteDB = await transporte.save();        
        res.json({
            ok: true,
            transporte: transporteDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
Transpo.actualizarUser = async(req, res = response) => {    
    const id  = req.params.id;
    const uid = req.uid;
    try {        
        const transporte = await Transporte.findById( id );
        if ( !transporte ) {
            return res.status(404).json({               
                msg: 'Votante no encontrado',
            });
        }
        const cambiostransporte = {
            ...req.body,
            usuario: uid
        }
        const transporteActualizado = await Transporte.findAndModify( id, cambiostransporte, { new: true } );
        res.json({
            transporte: transporteActualizado
        })
    } catch (error) { 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Transpo.deleteUser = async (req, res = response) => {   
    const id  = req.params.id;
    try {        
        const transporte = await Transporte.findById( id );

        if ( !transporte ) {
            return res.status(404).json({           
                msg: 'Votante no encontrado',
            });
        }

        await Transporte.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'transporte borrado'
        }); 

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = Transpo