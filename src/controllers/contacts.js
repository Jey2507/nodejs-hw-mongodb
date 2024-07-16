import createHttpError from "http-errors";
import { addContact, deleteContact, getAllContacts, getContact, patchContact } from "../services/contacts.js";

import pasrePaginationParams from "../utils/parsePaginationParams.js"
import parseSortParams from "../utils/parseSortParams.js";
import { contactFieldList } from "../constants/index.js";
import parseFilterParams from "../utils/parseFilterParams.js";

export const getAllContactsControllers =  async (req, res) => {
    const {_id: userId} = req.user;
    const { query } = req;
    const {page, perPage} = pasrePaginationParams(query);
    const {sortBy, sortOrder} = parseSortParams(query, contactFieldList)
    const filter = {...parseFilterParams(query),userId}

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
}

export const getContactByIdController = async (req, res) => {
    const {_id: userId} = req.user;
    const {id} = req.params;

    const contact = await getContact({_id: id,userId});

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  }

export const addContactController = async (req, res) => {
  const {_id: userId} = req.user;
    const data = await addContact({...req.body, userId});

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data
    })

}

export const patchContactController = async (req, res) => {
  const {_id: userId} = req.user;
  const { id } = req.params;

  const data = await patchContact({_id: id, userId}, req.body);

  if (!data) {
    throw createHttpError(404, "Contact not found")
  }

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: data.data,
  })
}

export const deleteContactByIdController = async (req, res) => {
  const {_id: userId} = req.user;
    const { id } = req.params;

    const contact = await deleteContact({_id: id, userId});

    if(!contact) {
        throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.status(204).json({
        status: 200,
        message: "Delete movie success",
        data: contact,
    })

}