
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app =express();


app.use(express.json());
app.use(cors({credentials:true,origin:`*`}));
app.use(express.static('public'));

const UserRouters = require('./routers/UserRouters')
const AgendaRouters = require('./routers/AgendaRouters')

app.use('/users', UserRouters);
app.use('/agendas',AgendaRouters);

app.listen(5000,(req,res)=>{
  console.log('Servidor online');
});