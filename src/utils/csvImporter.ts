import fs from "fs";
import csv from "csv-parser";
import Transaction from "../models/Transaction";

export const importTransactions = (filePath: string, userId: string) => {
  const transactions: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      transactions.push({
        userId,
        amount: parseFloat(row.amount),
        category: row.category,
        date: new Date(row.date),
        description: row.description,
      });
    })
    .on("end", async () => {
      try {
        await Transaction.insertMany(transactions);
        console.log("Transactions imported successfully.");
      } catch (error) {
        console.error("Error importing transactions:", error);
      }
    });
};
