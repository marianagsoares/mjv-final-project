import mongoose from 'mongoose';
import './env';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1/nodeSchool';

export default mongoose.connect(databaseUrl);
