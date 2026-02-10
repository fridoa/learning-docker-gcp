import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello dari Docker dan Cloud Run!' });
});

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});