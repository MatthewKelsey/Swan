import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const password:any= "mongodb+srv://Matthew:Whakedw1@cluster0.men6wel.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);
mongoose.set('debug', true)
mongoose.connect(password).then(() => {
  console.log('Connected to database');
});

export default mongoose;
