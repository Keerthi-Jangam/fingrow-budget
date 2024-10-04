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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const db_1 = require("../config/db");
const User_1 = __importDefault(require("../models/User"));
const Budget_1 = __importDefault(require("../models/Budget"));
const SavingGoal_1 = __importDefault(require("../models/SavingGoal"));
describe("Alert API", () => {
    let userId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
        yield User_1.default.deleteMany();
        const user = yield User_1.default.create({
            username: "testuser",
            password: "password123",
        });
        userId = user._id.toString();
        yield Budget_1.default.create({ userId, category: "Food", limit: 100, spent: 150 });
        yield SavingGoal_1.default.create({
            userId,
            title: "Vacation Fund",
            targetAmount: 1000,
            currentAmount: 950,
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.deleteMany();
        yield Budget_1.default.deleteMany();
        yield SavingGoal_1.default.deleteMany();
        yield mongoose_1.default.connection.close();
    }));
    it("should return budget and savings goal alerts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/alerts/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.alerts).toBeDefined();
        expect(Array.isArray(response.body.alerts)).toBe(true);
        expect(response.body.alerts.length).toBe(2);
        expect(response.body.alerts).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: "You have exceeded your budget for Food.",
            }),
            expect.objectContaining({
                message: "You are close to your savings goal for Vacation Fund.",
            }),
        ]));
    }));
});
