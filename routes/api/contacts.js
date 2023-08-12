const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");


router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  ctrl.updateFavorite
);

module.exports = router;
