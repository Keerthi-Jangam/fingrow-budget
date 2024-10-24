import {router} from "./Backend/Routes/router"
import express from 'express'
import cors from 'cors'

export const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',   
    credentials: true,   
    allowedHeaders: ['Content-Type', 'Authorization']             
  }
))
app.use('/',router);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

