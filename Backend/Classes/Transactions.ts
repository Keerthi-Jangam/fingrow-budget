import { TransactionModel } from "../Collections/Transactions";
import { UserModel } from "../Collections/User";
import { Budget } from "./Budget";
import { Savings } from "./Savings";

export class Transaction{
    title: string;
    amount:number;
    on:string;
    date:Date;
    username:string;

    constructor(title:string,amount: number,on: string,username:string, date?:Date) {
        this.title=title;
        this.amount = amount;
        this.on = on;
        this.date = date ? new Date(date) : new Date();
        this.username = username;
    }

    async doTransaction(){
        if(this.on==="budget"){
            const budget = new Budget(this.username)
            const result = await budget.makeTransaction(this.title, this.amount,this.date)
            return result;
        }
        else if(this.on==="saving"){
            const saving = new Savings(this.username)
            const result = await saving.makeTransaction(this.title, this.amount,this.date)
            return result;
        }
        else if(this.on==="others"){
            const user = await UserModel.findOne({name:this.username})
            if(!user){
                return "No user found"
            }
            const transaction = await TransactionModel.create({
                title: this.title,
                amount: this.amount,
                on:"others",
                date: this.date,
                type:this.amount>=0?"credit":"debit",
                userId:user._id
            });
            await transaction.save();
            user.totalIncome+=this.amount
            user.balance+=this.amount;
            await user.save();
            
            return "Succesfully transaction made";
        }
        else{
            return "Provide proper asset name"
        }
    }
}

