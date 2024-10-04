"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFinancialReport = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Budget_1 = __importDefault(require("../models/Budget"));
const SavingGoal_1 = __importDefault(require("../models/SavingGoal"));
const generateFinancialReport = (userId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield Transaction_1.default.find({
        userId,
        date: { $gte: startDate, $lte: endDate },
    });
    const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalExpenses = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    const budgets = yield Budget_1.default.find({ userId });
    const budgetSummary = budgets.map((budget) => ({
        category: budget.category,
        limit: budget.limit,
        spent: budget.spent,
    }));
    const savingsGoals = yield SavingGoal_1.default.find({ userId });
    const savingsProgress = savingsGoals.map((goal) => ({
        title: goal.title,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        progress: (goal.currentAmount / goal.targetAmount) * 100,
    }));
    return {
        totalIncome,
        totalExpenses,
        budgetSummary,
        savingsProgress,
    };
});
exports.generateFinancialReport = generateFinancialReport;
