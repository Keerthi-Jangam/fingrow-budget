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
exports.getBudgetsByUser = exports.createBudget = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const createBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budget = new Budget_1.default(req.body);
        yield budget.save();
        res.status(201).json(budget);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});
exports.createBudget = createBudget;
const getBudgetsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgets = yield Budget_1.default.find({ userId: req.params.userId });
        res.status(200).json(budgets);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.getBudgetsByUser = getBudgetsByUser;
