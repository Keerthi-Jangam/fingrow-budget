import express from 'express'
import { Savings } from '../Classes/Savings';
export const savingsRouter = express.Router();

savingsRouter.post('/savings/:username',async(req,res)=>{
    try {
        const saving = new Savings(req.params.username);
        const {title, target } = req.body;
        const result = await saving.createSaving(title, target);
        res.send(result)
    } catch (error:any) {
        res.status(500).send('Error creating saving: ' + error.message);
    }
})

