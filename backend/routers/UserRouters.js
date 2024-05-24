

const router = require('express').Router();
const UserController= require('../controller/UserController');
const {imageUpload} = require('../helpers/image-uploads');
const verifyToken = require('../helpers/verify-token');

//rotas publicas
router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get("/getUser",UserController.getUser);

//rotas privadas
router.patch('/update/:id',verifyToken,imageUpload.single("image"),UserController.update);
router.get("/searchUser/:id",UserController.searchUser);
router.get("/checkUser",UserController.checkUser);

module.exports= router;