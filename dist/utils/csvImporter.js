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
exports.importTransactions = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const importTransactions = (filePath, userId) => {
    const transactions = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on("data", (row) => {
        transactions.push({
            userId,
            amount: parseFloat(row.amount),
            category: row.category,
            date: new Date(row.date),
            description: row.description,
        });
    })
        .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Transaction_1.default.insertMany(transactions);
            console.log("Transactions imported successfully.");
        }
        catch (error) {
            console.error("Error importing transactions:", error);
        }
    }));
};
exports.importTransactions = importTransactions;
