import { router } from "./Backend/Routes/router";
import express from "express";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use("/", router);
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
