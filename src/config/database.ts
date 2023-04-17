import mongoose from 'mongoose';
import './env';

let databaseUrl = process.env.DEV_DATABASE_URL || 'mongodb://127.0.0.1/nodeSchool';

if (process.env.NODE_ENV === 'production') {
    databaseUrl = process.env.PRD_DATABASE_URL!;
}

export default mongoose.connect(databaseUrl);