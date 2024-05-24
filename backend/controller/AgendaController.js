const Agenda = require('../models/Agenda');

module.exports = class AgendaController{
    static async createAgenda(req,res){
     const {  agendamento, horario}= req.body;

     if(!agendamento){
        res.status(422).json({message:"Date is required!"});
        return;
    }
    if(!horario){
        res.status(422).json({message:"Hours is required"});
        return;
    }
    const agendaExists = await Agenda.findOne({horario})
    if(agendaExists){
        res.status(422).json({message:"Agenda já existe"});
        return;
    }
    const agenda = new Agenda({
        agendamento,
        horario,
        
    })
    try {
        const newAgenda = await agenda.save();
        res.status(201).json(newAgenda);
    } catch (error) {
        res.status(500).json({message:error});
    }

 }

 static async getAgenda(req, res) {
    const agendamento = req.body;

    try {
        const agenda = await Agenda.findOne(agendamento);

        if (!agenda || "") {
            return res.status(404).json({ msg: 'Agendamento não existe!' });
        }

        res.status(200).json({ agenda });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao buscar o agendamento' });
    }
}

}