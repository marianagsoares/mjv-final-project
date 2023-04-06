import mongoose from 'mongoose';
import './env';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1/nodejs_school';

export default mongoose.connect(databaseUrl);
