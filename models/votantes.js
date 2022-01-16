const {Schema, model} = require('mongoose');
const VotanrtesSchema = Schema({
  
numerodocumento:{
    type: 'string',
},
nombres: {
    type: 'string',
},
apellidos:{
    type: 'string',
},
tipodocumento:{
    type: 'string',
},

celular:{
    type: 'string',
},
email:{
    type: 'string',
},
estado:{
    type: 'string',
},
ciudad:{
    type: 'string',
},
direccion:{
    type: 'string',
},
lugardevotacion:{
    type: 'string',
},
voto:{
    type: 'string',
},
usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
},

});

VotanrtesSchema.method('toJSON', function() {
    const { __v, ...object}=this.toObject();
    return object;
})

module.exports = model('Votanrtes', VotanrtesSchema);
