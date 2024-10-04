import Transaction from "../models/Transaction";

export const createTransaction = async (
  userId: string,
  amount: number,
  category: string,
  date: Date,
  description: string
) => {
  const transaction = new Transaction({
    userId,
    amount,
    category,
    date,
    description,
  });
  await transaction.save();
  return transaction;
};

export const getTransactionsByUser = async (userId: string) => {
  return await Transaction.find({ userId });
};

export const updateTransaction = async (
  transactionId: string,
  updates: Partial<{
    amount: number;
    category: string;
    date: Date;
    description: string;
  }>
) => {
  return await Transaction.findByIdAndUpdate(transactionId, updates, {
    new: true,
  });
};

export const deleteTransaction = async (transactionId: string) => {
  return await Transaction.findByIdAndDelete(transactionId);
};
