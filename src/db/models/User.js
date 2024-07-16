import { model, Schema } from "mongoose";
import { email } from "../../constants/index.js";
import { mongooseSaveError, setUpdateSetting } from "./hooks.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: email,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
},{
    versionKey: false, timestamps: true
})

userSchema.post("save", mongooseSaveError)

userSchema.pre("findOneAndUpdate", setUpdateSetting)

userSchema.post("findOneAndUpdate", mongooseSaveError)

const User = model("user", userSchema);

export default User;