import mongoose from 'mongoose'
import dotenv from 'dotenv'

import app from '../src/httpServer'

dotenv.config()

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });
  