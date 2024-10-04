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
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({ username, password });
    yield user.save();
    return user;
});
exports.createUser = createUser;
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(userId);
});
exports.getUser = getUser;
const updateUser = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndUpdate(userId, updates, { new: true });
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndDelete(userId);
});
exports.deleteUser = deleteUser;
