import express from "express";
import { Transaction } from "../Classes/Transactions";
import { processCSV } from "../Utils/utils";

export const TransactionRouter = express.Router();

TransactionRouter.post('/transaction/:username',async(req,res)=>{
    const {title,amount,on,date} = req.body;
    try {
        const transaction = new Transaction(title,amount,on,req.params.username,date);
        const result = await transaction.doTransaction();
        res.send(result);
    } catch (error:any) {
        res.status(500).send('Error making transaction: ' + error.message);
    }
})


TransactionRouter.post('/maketransactions',async(req,res)=>{
    try{
        const result = await processCSV();
        res.send(result);
    }
    catch(e:any){
        res.send(`Error occured while adding Transactions ${e.message}`)
    }
})