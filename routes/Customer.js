const express = require('express');
const { route } = require('.');
const router = express.Router();
const CustomerController = require('../Controller/Customer');

router.route("/").post(CustomerController.addCustomer);
router.route("/:code").put(CustomerController.updateCustomer);
router.route("/:code").delete(CustomerController.deleteCustomer);
router.route("/").get(CustomerController.getAllCustomer);
router.route("/:code").get(CustomerController.getCustomerByCode);

module.exports = router;