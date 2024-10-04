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
exports.checkBudgetUsage = exports.deleteBudget = exports.updateBudget = exports.getBudgetsByUser = exports.createBudget = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const createBudget = (userId, category, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const budget = new Budget_1.default({ userId, category, limit });
    yield budget.save();
    return budget;
});
exports.createBudget = createBudget;
const getBudgetsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Budget_1.default.find({ userId });
});
exports.getBudgetsByUser = getBudgetsByUser;
const updateBudget = (budgetId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Budget_1.default.findByIdAndUpdate(budgetId, updates, { new: true });
});
exports.updateBudget = updateBudget;
const deleteBudget = (budgetId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Budget_1.default.findByIdAndDelete(budgetId);
});
exports.deleteBudget = deleteBudget;
const checkBudgetUsage = (budgetId) => __awaiter(void 0, void 0, void 0, function* () {
    const budget = yield Budget_1.default.findById(budgetId);
    return budget ? budget.spent / budget.limit : null;
});
exports.checkBudgetUsage = checkBudgetUsage;
