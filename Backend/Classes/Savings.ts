import { UserModel } from "../Collections/User";
import { TransactionModel } from "../Collections/Transactions";
import { SavingsModel } from "../Collections/Savings";

export class Savings{
    username:string;

    constructor(name:string){
        this.username = name;
    }

    async createSaving(title:string,target:number){
        const user = await UserModel.findOne({name:this.username})
        if (!user) {
            return "User with the given username is not present";
        }
        let saving = await SavingsModel.findOne({userId:user._id})
        if(!saving){
            saving = new SavingsModel({
                userId:user._id,
                savings:[]
            })
        }

        const savingsExist = saving.savings.some(
            (saving) => saving.title === title
        );
        if (savingsExist) {
            return `Savings ${title} already exists. Can't add.`;
        }

        saving.savings.push({
            "title":title,
            "target":target,
            "current":0,
            "transactions":[]
        })
        await saving.save();
        return `Added saving goal ${title} successfully.`
    }

    async makeTransaction(title:string, amount:number, date:Date){
        const user = await UserModel.findOne({name:this.username})
        if (!user) {
            return "User with the given username is not present";
        }
        let saving = await SavingsModel.findOne({userId:user._id})
        if(!saving){
            return "Saving Not Found for the provided user";
        }
        const index = saving.savings.findIndex(
            (saving) => saving.title === title
        );
        if(index===-1) {
            return `Saving "${title}" does not  exists. Can't make transactions.`;
        }
        if(amount>user.balance){
            return `Can't make a transaction as insufficient funds`;
        }
        if(amount+saving.savings[index].current>saving.savings[index].target){
            return `Can't do transaction as it is exceeding target amount`;
        }
        
        const transaction = await TransactionModel.create({
            title: title,
            amount: amount,
            on:"saving",
            date: date,
            type:"debit",
            userId:user._id
        });

        await transaction.save();
        saving.savings[index].current += amount;
        saving.savings[index].transactions.push(transaction._id)
        user.balance -= amount;

        await saving.save();
        await user.save();

        let message=''
        if(saving.savings[index].current>=0.90*saving.savings[index].target){
            message=" Also, Congratulations as you have saved 90% of the target anount"
        }

        return `Transaction made succesfully on ${title} for an amount ${amount}.${message}`
    }

    async updateSavings(title:string, amount:number,){
        const user = await UserModel.findOne({name:this.username})
        if (!user) {
            return "User with the given username is not present";
        }
        let saving = await SavingsModel.findOne({userId:user._id})
        if(!saving){
            return "Saving Not Found for the provided user";
        }
        const index = saving.savings.findIndex(
            (saving) => saving.title === title
        );
        if(index===-1) {
            return `Saving "${title}" does not  exists. Can't make transactions.`;
        }
        if(amount < saving.savings[index].current){
            return "Can't update the target amount as it is becoming less than current saved"
        }
        saving.savings[index].target = amount;
        await saving.save();

        return `Savings Target updated succesfully for ${title}`;
    }
}