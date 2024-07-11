import { contactFieldList, sortOrderList } from "../constants/index.js";
import { ContactColection } from "../db/models/Contact.js";
import calcPaginationData from "../utils/calcPaginationData.js";

export const getAllContacts = async ({page, perPage, sortBy = contactFieldList[0], sortOrder = sortOrderList[0], filter}) => {
    const skip = (page - 1) * perPage;

    const databaseQuery = ContactColection.find();
    
    if(filter.contactType) {
        databaseQuery.where("contactType").equals(filter.contactType);
    }

    if(filter.isFavourite != null) {
        databaseQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const data = await databaseQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const totalItems = await ContactColection.find().merge(databaseQuery).countDocuments();
    const {totalPages, hasNextPages, hasPreviousPages } = calcPaginationData({total: totalItems, page, perPage})

    return {
        data,
        page,        
        perPage,
        totalItems,
        totalPages,
        hasPreviousPages,
        hasNextPages,   
    }
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