import { Request, Response } from "express";
import { generateFinancialReport } from "../services/reportService";

export const getFinancialReport = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const report = await generateFinancialReport(
      req.params.userId,
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.status(200).json(report);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
