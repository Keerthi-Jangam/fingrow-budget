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
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionsByUser = exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const createTransaction = (userId, amount, category, date, description) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new Transaction_1.default({
        userId,
        amount,
        category,
        date,
        description,
    });
    yield transaction.save();
    return transaction;
});
exports.createTransaction = createTransaction;
const getTransactionsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Transaction_1.default.find({ userId });
});
exports.getTransactionsByUser = getTransactionsByUser;
const updateTransaction = (transactionId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Transaction_1.default.findByIdAndUpdate(transactionId, updates, {
        new: true,
    });
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Transaction_1.default.findByIdAndDelete(transactionId);
});
exports.deleteTransaction = deleteTransaction;
