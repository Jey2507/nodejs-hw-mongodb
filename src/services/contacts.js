import { ContactColection } from "../db/models/Contact.js";

export const getAllContacts = async () => {
    const contacts = await ContactColection.find();
    return contacts;
}

export const getContactById = async (contact) => {
    const data = await ContactColection.findById(contact);
    return data;
}

export const addContact = contact => ContactColection.create(contact);

export const patchContact = async (filter, data, options = {}) => {
    const result = await ContactColection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!result || !result.value) return null;

    const isNew = Boolean(result?.lastErrorObject?.upserted);

    return {
        data: result.value,
        isNew,
    }
}

export const deleteContact = filter => ContactColection.findOneAndDelete(filter);