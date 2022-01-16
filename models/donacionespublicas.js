const {Schema, model} = require('mongoose');
const DonacionesPublicasSchema = Schema({
  
nombreentidad: {
    type: 'string',
},
representante:{
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
DonacionesPublicasSchema.method('toJSON', function() {
    const { __v, ...object}=this.toObject();
    return object;
})
module.exports = model('DonacionesPublicas', DonacionesPublicasSchema);
