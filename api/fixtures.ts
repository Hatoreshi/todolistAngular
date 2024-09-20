import mongoose from 'mongoose';
import config from './config';

import User from './models/User';
import Task from './models/Task';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'tasks'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user1, user2] = await User.create(
    {
      username: 'user1',
      password: '123456!@QW',
      token: crypto.randomUUID(),
    },
    {
      username: 'user2',
      password: '78945)(PO',
      token: crypto.randomUUID(),
    },
  );

  await Task.create(
    {
      user: user1,
      title: 'Do homework',
      description: 'Deadline 19/02/2024',
      status: 'in_progress',
    },
    {
      user: user2,
      title: 'Play video games',
      description: 'Play it takes two',
      status: 'new',
    },
  );

  await db.close();
};

void run();
