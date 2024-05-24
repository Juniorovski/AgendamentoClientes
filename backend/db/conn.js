require('dotenv').config();
const mongoose = require('mongoose');

const dbUser = process.env.DB_USERS;
const dbPass = process.env.DB_PASSWORD;

const main = async ()=>{
 await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.betei9v.mongodb.net/`);
 console.log('Conectado ao Mongoose!');
}

main().catch((err)=>{
    console.log(err)
});

module.exports= mongoose;