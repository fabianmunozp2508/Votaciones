const {Schema, model} = require('mongoose');
const DonacionesSchema = Schema({
  
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
tipodonacion:{
    type: 'string',
},
cantidad:{
    type: 'string',
},
detalles:{
    type: 'string',
},
metodo:{
    type: 'string',
},
recibe: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
},

});

DonacionesSchema.method('toJSON', function() {
    const { __v, ...object}=this.toObject();
    return object;
})

module.exports = model('Donaciones', DonacionesSchema);
