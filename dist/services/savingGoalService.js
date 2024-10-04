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
exports.checkSavingsGoalProgress = exports.deleteSavingsGoal = exports.updateSavingsGoal = exports.getSavingsGoalsByUser = exports.createSavingsGoal = void 0;
const SavingGoal_1 = __importDefault(require("../models/SavingGoal"));
const createSavingsGoal = (userId, title, targetAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const savingsGoal = new SavingGoal_1.default({ userId, title, targetAmount });
    yield savingsGoal.save();
    return savingsGoal;
});
exports.createSavingsGoal = createSavingsGoal;
const getSavingsGoalsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SavingGoal_1.default.find({ userId });
});
exports.getSavingsGoalsByUser = getSavingsGoalsByUser;
const updateSavingsGoal = (goalId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SavingGoal_1.default.findByIdAndUpdate(goalId, updates, { new: true });
});
exports.updateSavingsGoal = updateSavingsGoal;
const deleteSavingsGoal = (goalId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SavingGoal_1.default.findByIdAndDelete(goalId);
});
exports.deleteSavingsGoal = deleteSavingsGoal;
const checkSavingsGoalProgress = (goalId) => __awaiter(void 0, void 0, void 0, function* () {
    const goal = yield SavingGoal_1.default.findById(goalId);
    return goal ? goal.currentAmount / goal.targetAmount : null;
});
exports.checkSavingsGoalProgress = checkSavingsGoalProgress;
