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
exports.getUserAlerts = exports.checkSavingsGoalAlerts = exports.checkBudgetAlerts = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const SavingGoal_1 = __importDefault(require("../models/SavingGoal"));
const checkBudgetAlerts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const budgets = yield Budget_1.default.find({ userId });
    const alerts = [];
    budgets.forEach((budget) => {
        if (budget.spent > budget.limit) {
            alerts.push(`You have exceeded your budget for ${budget.category}.`);
        }
    });
    return alerts;
});
exports.checkBudgetAlerts = checkBudgetAlerts;
const checkSavingsGoalAlerts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const savingsGoals = yield SavingGoal_1.default.find({ userId });
    const alerts = [];
    savingsGoals.forEach((goal) => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        if (progress >= 90 && progress < 100) {
            alerts.push(`You are close to reaching your savings goal for ${goal.title} (90% or more achieved).`);
        }
        else if (progress >= 100) {
            alerts.push(`Congratulations! You have reached your savings goal for ${goal.title}.`);
        }
    });
    return alerts;
});
exports.checkSavingsGoalAlerts = checkSavingsGoalAlerts;
const getUserAlerts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const budgetAlerts = yield (0, exports.checkBudgetAlerts)(userId);
    const savingsAlerts = yield (0, exports.checkSavingsGoalAlerts)(userId);
    return [...budgetAlerts, ...savingsAlerts];
});
exports.getUserAlerts = getUserAlerts;
