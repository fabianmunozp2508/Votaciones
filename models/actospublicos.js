const {Schema, model} = require('mongoose');
const ActosPublicosSchema = Schema({
  
nombreevento:{
    type: 'string',
},
lugarvento: {
    type: 'string',
},
organizador:{
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
fechaevento:{
    type: 'string',
},
cantidad:{
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

ActosPublicosSchema.method('toJSON', function() {
    const { __v, ...object}=this.toObject();
    return object;
})

module.exports = model('ActosPublicos', ActosPublicosSchema);
