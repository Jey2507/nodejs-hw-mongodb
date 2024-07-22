import { Schema, model } from "mongoose";
import { mongooseSaveError, setUpdateSetting } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        required: true,
        default: "personal"
    },
    photo: {
        type: String,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

contactSchema.post("save", mongooseSaveError)

contactSchema.pre("findOneAndUpdate", setUpdateSetting)

contactSchema.post("findOneAndUpdate", mongooseSaveError)

export const ContactColection = model('contacts', contactSchema);