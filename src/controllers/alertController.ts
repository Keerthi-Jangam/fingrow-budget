import { Request, Response } from "express";
import { getUserAlerts } from "../services/alertService";

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await getUserAlerts(req.params.userId);
    res.status(200).json({ alerts });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
