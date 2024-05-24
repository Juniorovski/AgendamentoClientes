
const router = require('express').Router();

const AgendaController = require('../controller/AgendaController');
const auth = require('../middlewares/auth');
const checkUser = require('../controller/UserController')

router.post('/createAgenda',AgendaController.createAgenda);
router.get('/getAgenda',AgendaController.getAgenda);
module.exports = router;