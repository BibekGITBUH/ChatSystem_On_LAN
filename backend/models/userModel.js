import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  uniqueID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},{ timestamps: true });

const User = model('User', userSchema);
export default User;
