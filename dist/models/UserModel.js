import mongoose from "mongoose";
import { ROLES } from "../utils/constant.js";
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    // id: {
    //   type: String,
    //   required: true,
    // },
    role: {
        type: String,
        enum: ROLES,
        default: "user" /* _user.USER */,
    },
    avatar: String,
    avatarPublicId: String,
    isVerified: {
        type: Boolean,
        enum: [true, false],
        default: "false",
    },
});
UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
};
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=UserModel.js.map