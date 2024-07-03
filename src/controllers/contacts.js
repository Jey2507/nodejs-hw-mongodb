import createHttpError from "http-errors";
import { addContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js";

export const getAllContactsControllers =  async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
}

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);

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
    const data = await addContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data
    })

}

export const patchContactController = async (req, res) => {
  const { id } = req.params;

  const data = await patchContact({_id: id}, req.body);

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
    const { id } = req.params;

    const contact = await deleteContact({_id: id});

    if(!contact) {
        throw createHttpError(404, `Contact with id=${id} not found`);
    }

    res.status(204)

}