import mongoose from "mongoose";

const UserSchema =mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {} },
  },
  { minimize: false }
);

const User = mongoose.model.User || mongoose.model("User", UserSchema);

export default User;


