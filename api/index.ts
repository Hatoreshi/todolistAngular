import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';

import taskRouter from './routers/tasks';
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/tasks', taskRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
