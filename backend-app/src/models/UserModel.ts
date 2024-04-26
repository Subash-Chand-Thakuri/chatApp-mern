import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// TypeScript interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Mongoose schema definition for User
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Method to match user passwords
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash password if it's been modified
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
