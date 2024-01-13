const express = require("express");
const router = express.Router();
const contact = require('../controllers/contactController');
const validationToken = require("../middleware/validateTokenHandler");

router.use(validationToken);
router.route("/").get(contact.getContacts).post(contact.createNewContact);
router.route("/:id").get(contact.getContact).put(contact.updateContact).delete(contact.deleteContact);


module.exports= router;