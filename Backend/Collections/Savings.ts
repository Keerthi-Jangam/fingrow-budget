import { Schema, Types } from "mongoose";
import { config } from "../Config/Config";

interface ISavings extends Document{
    userId: Schema.Types.ObjectId,
    savings:Array<{"title":string,"target":number,"current":number,"transactions":Array<Types.ObjectId>}>
   
}

const savingsSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    savings:[{
        title:{
            type:String,
            required:true,
        },
        target:{
            type:Number,
            required:true,
        },
        current:{
            type:Number,
            required:true,
        },
        transactions: [{ type: Schema.Types.ObjectId, ref: "transactions" }],
    }],
})

export const SavingsModel = config.model<ISavings>("savings",savingsSchema);
console.log("Savings Model created");