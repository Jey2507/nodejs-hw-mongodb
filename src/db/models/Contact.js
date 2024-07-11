import { Schema, model } from "mongoose";
import { mongoodeSaveError, setUpdateSetting } from "./hooks.js";

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
    }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

contactSchema.post("save", mongoodeSaveError)

contactSchema.post("findOneAndUpdate", setUpdateSetting)

contactSchema.post("findOneAndUpdate", mongoodeSaveError)

export const ContactColection = model('contacts', contactSchema);