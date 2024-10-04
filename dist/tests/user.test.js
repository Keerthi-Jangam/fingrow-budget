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
const mongoose_1 = __importDefault(require("mongoose"));
describe("User API", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
        yield User_1.default.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.deleteMany();
        mongoose_1.default.connection.close();
    }));
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/users").send({
            username: "testuser",
            password: "password123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("username", "testuser");
    }));
    it("should retrieve a user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.create({
            username: "testuser2",
            password: "password123",
        });
        const response = yield (0, supertest_1.default)(app_1.app).get(`/api/users/${user._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("username", "testuser2");
    }));
    it("should return 404 for non-existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/api/users/60b8d3c7e5fdf35d34b10c2f");
        expect(response.status).toBe(404);
    }));
});
