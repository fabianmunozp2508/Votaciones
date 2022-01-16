const {Schema, model} = require('mongoose');
const TransporteSchema = Schema({
  
nombres:{
    type: 'string',
},
apellidos: {
    type: 'string',
},
tipodocumento:{
    type: 'string',
},
numerodocumento:{
    type: 'string',
},
celular:{
    type: 'string',
},
email:{
    type: 'string',
},
tipovehiculo:{
    type: 'string',
},
placa:{
    type: 'string',
},
cantidad:{
    type: 'string',
},
metodo:{
    type: 'string',
},
detalles:{
    type: 'string',
},
recibe: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
},

});
TransporteSchema.method('toJSON', function() {
    const { __v, ...object}=this.toObject();
    return object;
})
module.exports = model('Transporte', TransporteSchema);
