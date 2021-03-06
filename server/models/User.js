import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  ADMIN: "admin",
  USER: "user",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: {type:String,
    required:true,
    unique:true
  },
    lastName: {type:String,
      required:true,
      unique:true
    },
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);


userSchema.statics.createUser = async function (firstName, lastName, type) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUserById = async function (id,firstName) {
  try {
    const user = await this.findOne({ _id: id });
        if (!user) throw ({ error: 'No user with this id found' });
    return user;
    const contacts = [];
    contacts.push({id:User._id,firstName:User.firstName})
    console.log(contacts)

  } catch (error) {
    throw error;
  }
}


userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}


userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}


userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("User", userSchema);
