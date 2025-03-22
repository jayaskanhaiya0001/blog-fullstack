import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' }, 
});

const Blacklist = mongoose.models.Blacklist || mongoose.model('Blacklist', blacklistSchema);

export default Blacklist;