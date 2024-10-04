import express from "express";
import {
  createTransaction,
  getTransactionsByUser,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/", createTransaction);
router.get("/:userId", getTransactionsByUser);

export default router;
