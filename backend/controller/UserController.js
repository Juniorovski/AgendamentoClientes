const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const getUserByToken = require('../helpers/get-user-by-token');
const getToken = require('../helpers/get-token')
require('dotenv').config();
const createUsertoken = require('../helpers/create-user-token');

const secret= process.env.SECRET_TOKEN;

module.exports = class UserController{
    static async register(req,res){
        const{name,email,password,confirmpassword}= req.body;
        if(!name){
            res.status(422).json({message:"Name is required!"});
            return;
        }
        if(!email){
            res.status(422).json({message:"Email is required"});
            return;
        }
        if(!password){
            res.status(422).json({message:"Password is required!"});
            return;
        }
        if(!confirmpassword){
            res.status(422).json({message:"Corfirm Password is required!"});
            return;
        }
        if(password !== confirmpassword){
          res.status(422).json({message:"password e confirmpassword precisam serem iguais!"})
          return;
      }
  
        const userExists = await User.findOne({email:email})
          if(userExists){
            res.status(422).json({message:'Email  já cadastrado!'});
          }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password,salt);

        const user = new User({
            name,
            email,
            password:passwordHash,
        }) 

        try{
            const newUser= await user.save()
            await createUsertoken(newUser,req,res);
        }
        catch(error){
            res.status(500).json({message:error});
        }
    }
    static async login (req,res){
        const {email,password} = req.body;
        if(!email){
            res.status(422).json({message:"O email é obrigatorio!"});
            return;
          }
          if(!password){
            res.status(422).json({message:"O password é obrigatorio!"});
            return;
          }

          const user = await User.findOne({email:email})
          if(!user){
            res.status(422).json({message:"Usuario nao existe!"});
            return;
          }

          const checkPassword = await bcrypt.compare(password,user.password);

          if(!checkPassword){
      
            res.status(422).json({message:"Senha Invalida!"});
            return;
          }
          await createUsertoken(user,req,res);
    }


    static async checkUser(req,res){
      let currentUser;

      if(req.headers.authorization){
        const token = getToken(req);
        const decoded = jwt.verify(token,`${secret}`);
       currentUser = await User.findById(decoded.id);
      currentUser.password= undefined;
      }else{
        currentUser=null;
      }
      res.status(200).send(currentUser)
    }

    static async getUser(req,res){
      const name = req.body
      const user = await  User.findOne(name,'-password')
      if(!user){
        return res.send.status(404).json({message:"Usuário nao encontrado!"});
      }
      res.status(200).json({user});
    }

    static async searchUser( req,res){
      const id = req.params.id;
      const user = await User.findById(id, '-password')
      if(!user){
      return res.status(404).json({message:"Usuario nao encontrado!"})
      }
      res.status(200).json({user});
    }

    
    static async update (req,res){ 
       const id = req.params.id;
       const token = getToken(req);
       const user = await getUserByToken(token);

        const {name,email}= req.body;

        if(req.file){
         user.image = req.file.filename
        }

       //validations
        if(!name){
          res.status(422).json({message:"Name is required!"});
          return;
      }
      user.name = name;
      if(!email){
          res.status(422).json({message:"Email is required"});
          return;
      }
     
      //check se user existe  
      const userExists = await User.findOne({email:email});

      if(user.email !== email && userExists){
        res.status(422).json({
          message:"Por favor, utilize outro email!",
        })
        return;
      }
      user.email= email;
    
     /* if(password !== confirmpassword){
        res.status(422).json({message:"password e confirmpassword precisam serem iguais!"})
        return;
    }else if(password === confirmpassword && password != null){
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password,salt);

        user.password = passwordHash;
    }*/
     try {

       await User.findOneAndUpdate(
        {_id: user.id},
        {$set: user},
        {new: true}, 
      )

      res.status(200).json({message:"Usuario atualizado com susesso!"});
        
     } catch (err) {
       res.status(500).json({message:err});
     }  

    }


}