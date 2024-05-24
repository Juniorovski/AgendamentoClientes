const jwt = require('jsonwebtoken');

const createUsertoken = async (user,req,res)=>{
    const token = jwt.sign({
        name:user.name,
        id:user._id
    },"secretToken")

    res.status(200).json({message:"Você esta autenticado!",
        name:user.name,
        token:token,
        userId:user._id,
    })
}

module.exports= createUsertoken;