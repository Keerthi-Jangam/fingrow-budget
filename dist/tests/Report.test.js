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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const db_1 = require("../config/db");
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const mongoose_1 = __importDefault(require("mongoose"));
describe("Report API", () => {
    let userId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
        yield User_1.default.deleteMany();
        const user = yield User_1.default.create({
            username: "testuser",
            password: "password123",
        });
        userId = user._id.toString();
        yield Transaction_1.default.create({
            userId,
            amount: 500,
            category: "Salary",
            date: new Date(),
            description: "Monthly Salary",
        });
        yield Transaction_1.default.create({
            userId,
            amount: -50,
            category: "Groceries",
            date: new Date(),
            description: "Groceries shopping",
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.deleteMany();
        yield Transaction_1.default.deleteMany();
        mongoose_1.default.connection.close();
    }));
    it("should generate a financial report", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/reports/${userId}?startDate=2024-01-01&endDate=2024-12-31`);
        expect(response.status).toBe(200);
        expect(response.body.totalIncome).toBe(500);
        expect(response.body.totalExpenses).toBe(50);
    }));
});
