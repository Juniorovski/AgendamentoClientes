
const mongoose = require('../db/conn');
const{ Schema} = mongoose;

const Agenda = mongoose.model(
    "Agenda",

    new Schema({
        agendamento:{
            type:String,
            required:true
        },
        horario:{
            type:String,
            required:true
        },
        servico:{
            type:String,
            required:true
        },
       /* user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }*/
    },

    {timestamps: true},
    ),
)
module.exports = Agenda;