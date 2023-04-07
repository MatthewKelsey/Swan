import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const password:string= process.env.MONGODB_CREDENTIALS;

mongoose.set('strictQuery', true);

mongoose.connect(password).then(() => {
  console.log('Connected to database');
});

export default mongoose;
