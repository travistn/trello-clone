import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  guestId: {
    type: String,
  },
  accountType: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
