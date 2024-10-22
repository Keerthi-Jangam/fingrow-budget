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
exports.getSavingsGoalsByUser = exports.createSavingsGoal = void 0;
const SavingGoal_1 = __importDefault(require("../models/SavingGoal"));
const createSavingsGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savingsGoal = new SavingGoal_1.default(req.body);
        yield savingsGoal.save();
        res.status(201).json(savingsGoal);
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
exports.createSavingsGoal = createSavingsGoal;
const getSavingsGoalsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savingsGoals = yield SavingGoal_1.default.find({ userId: req.params.userId });
        res.status(200).json(savingsGoals);
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
exports.getSavingsGoalsByUser = getSavingsGoalsByUser;