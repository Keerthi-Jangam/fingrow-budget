"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const budgetController_1 = require("../controllers/budgetController");
const router = express_1.default.Router();
router.post("/", budgetController_1.createBudget);
router.get("/:userId", budgetController_1.getBudgetsByUser);
exports.default = router;
