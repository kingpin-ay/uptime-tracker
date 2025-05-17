import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Uptime Tracker Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 