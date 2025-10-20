import express from "express";
import{
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    Login
} from '../Controller/UserController.mjs';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/:id', searchUsers);
router.post('/login', Login);
export default router;

