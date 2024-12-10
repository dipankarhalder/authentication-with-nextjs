import mongoose, {Schema, Document, Model} from "mongoose";
import {IUserRequest} from "@/interface";

interface IUsers extends IUserRequest, Document {
}

const UserSchema: Schema<IUsers> = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    user_role: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {timestamps: true}
);

const Users: Model<IUsers> = mongoose.models.Users || mongoose.model<IUsers>("Users", UserSchema);
export default Users;