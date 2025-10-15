import express from "express";
import{
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../Controller/UserController.mjs';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/add/user', createUser);
router.put('/update/user/:id', updateUser);
router.delete('/delete/user/:id', deleteUser);
export default router;

