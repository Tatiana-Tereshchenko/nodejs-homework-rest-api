const {Contact} = require("../models/contact")
const {HttpError,  ctrlWrapper } = require("../helpers");



const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 10, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
    const contactList = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit});
    res.status(200).json(contactList);
};

const getContactById = async (req, res) => {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      throw HttpError(404, "Not found");
    }
};



const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};



const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  if (!("favorite" in req.body)) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};



