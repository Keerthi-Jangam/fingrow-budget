import express from 'express'
import { Report } from '../Classes/Report';
export const ReportsRouter = express.Router();

ReportsRouter.get('/report/:username',async(req,res)=>{
    try{
        const report = new Report(req.params.username)
        const {startDate,endDate} = req.body
        const totalIncomeAndExpenses = await report.totalIncomeAndExpenses(startDate,endDate);
        const budgetUsageSummary = await report.budgetUsageSummary();
        const progressPercentage = await report.savingsProgress();

        const finalreport = {
            totalIncomeAndExpenses,
            budgetUsageSummary,
            progressPercentage
        }
        res.send(finalreport);

    }
    catch(e){
        res.send(e);
    }
})