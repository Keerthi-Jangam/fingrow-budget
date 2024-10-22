import express from 'express'
import { User } from '../Classes/User';
export const userRouter = express.Router();

userRouter.post('/users',async(req,res)=>{
    try{
        const { name, password, totalIncome, balance } = req.body;
        const user = new User(name, password, totalIncome, balance);
        const result = await user.create();
        res.send(result)
    }
    catch(error:any){   
        res.status(500).send('Error creating user: ' + error.message);
    }   
})


