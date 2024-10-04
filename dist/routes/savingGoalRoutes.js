"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const savingGoalController_1 = require("../controllers/savingGoalController");
const router = express_1.default.Router();
router.post("/", savingGoalController_1.createSavingsGoal);
router.get("/:userId", savingGoalController_1.getSavingsGoalsByUser);
exports.default = router;
