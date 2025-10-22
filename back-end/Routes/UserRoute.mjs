import express from "express";
import{
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    Login,
    auth,
    sendmail
} from '../Controller/UserController.mjs';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/protected', auth , (req , res)=>res.send('hello'));
router.get('/:id', searchUsers);    
router.post('/login',  Login);
router.post('/sendmail', sendmail);
export default router;

