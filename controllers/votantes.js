const { response } = require('express');
const Votantes = require('../models/votantes');
const Votos = {};


Votos.getTotal = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [ votantes, total ] = await Promise.all([
        Votantes
            .find({}, 'nombres')
            .populate('usuario','nombre img')
            .skip( desde )
            .limit( 5 ),            
            Votantes.countDocuments()
    ]);
    res.json({
        ok: true,
        votantes,
        total
    });

}

Votos.get = async (req, res = response) => {
    const votantes = await Votantes.find()
                                .populate('usuario','nombre img')
    res.json({      
        votantes
    })
}
Votos.getforUser = async (req, res = response) => {
    const votantes = await Votantes.find({'usuario': _id})
                                .populate('usuario','nombre img')
    res.json({      
        votantes
    })
}
Votos.getById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const votantes = await Votantes.findById(id)
                                    .populate('usuario','nombre img')                                  
        res.json({           
            votantes
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Votos.Crear = async (req, res = response) => {
    const uid = req.uid;
    const votantes = new Votantes({
        usuario: uid,
        ...req.body
    });
    try {
        const votanteDB = await votantes.save();        
        res.json({
            ok: true,
            votantes: votanteDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
Votos.actualizarUser = async(req, res = response) => {    
    const id  = req.params.id;
    const uid = req.uid;
    try {        
        const votantes = await Votantes.findById( id );
        if ( !votantes ) {
            return res.status(404).json({               
                msg: 'Votante no encontrado',
            });
        }
        const cambiosVotantes = {
            ...req.body,
            usuario: uid
        }
        const votanteActualizado = await Votantes.findAndModify( id, cambiosVotantes, { new: true } );
        res.json({
            votantes: votanteActualizado
        })
    } catch (error) { 
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

Votos.deleteUser = async (req, res = response) => {   
    const id  = req.params.id;
    try {        
        const votantes = await Votantes.findById( id );

        if ( !votantes ) {
            return res.status(404).json({           
                msg: 'Votante no encontrado',
            });
        }

        await Votantes.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Votante borrado'
        }); 

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = Votos