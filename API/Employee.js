const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../DB/Employee');

const route = express.Router();

route.post('/', async (req, res)=> {
    const{code, type, firstname, lastname, birthday, sex, address, phone, username, password, role} = req.body;
    let employee = {};
    employee.code = code;
    employee.type = type;
    employee.firstname = firstname;
    employee.lastname = lastname;
    employee.birthday = birthday;
    employee.sex = sex;
    employee.address = address;
    employee.phone = phone;
    employee.username = username;
    employee.password = password;
    employee.role = role;

    let employeeModel = new Employee(employee);
    await employeeModel.save();
    res.status(200).json({
        code: 200, 
        message: "Add employee successfull", 
        success: true});
});

module.exports = route;