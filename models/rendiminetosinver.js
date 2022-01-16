const {Schema, model} = require('mongoose');
const RendimientoinverSchema = Schema({
  
nombredelainversion:{
    type: 'string',
},
valorinvertido: {
    type: 'string',
},
fechainversion:{
    type: 'string',
},

valorganado:{
    type: 'string',
},
responsable:{
    type: 'string',
},
documento:{
    type: 'string',
},
telefono:{
    type: 'string',
},
email:{
    type: 'string',
},
detalles:{
    type: 'string',
},
codigo:{
    type: 'string',
},
recibe: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
},

});

RendimientoinverSchema.method('toJSON', function() {
    const { __v, ...object}=this.toObject();
    return object;
})

module.exports = model('Rendimientoinver', RendimientoinverSchema);
