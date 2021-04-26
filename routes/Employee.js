const express = require('express');
const { route } = require('.');
const router = express.Router();
const EmployeeController = require('../Controller/Employee');

router.route("/").post(EmployeeController.addEmployee);
router.route("/:code").put(EmployeeController.updateEmployee);
router.route("/:code").delete(EmployeeController.deleteEmployee);
router.route("/").get(EmployeeController.getAllEmployee);
router.route("/:code").get(EmployeeController.getEmployeeByCode);

module.exports = router;