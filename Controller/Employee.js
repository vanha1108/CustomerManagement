const Employee = require('../DB/Employee')

const addEmployee = async (req, res, next) => {
    var {code, type, firstname, lastname, birthday, email, sex, address, phone, username, password, role} = req.body;

    const checkCode = await Employee.findOne({code: code});
    if (checkCode) {
        return res.status.json({
            success: false,
            code: 500,
            message: "Code employee already exists!",
          });
    }

    const checkUsername = await Employee.findOne({username: username});
    if (checkUsername) {
        return res.status.json({
            code: 500,
            message: "Username already exists!",
            success: false
        });
    }

    let employee = {};
    employee.code = code;
    employee.type = type;
    employee.firstname = firstname;
    employee.lastname = lastname;
    employee.birthday = birthday;
    employee.email = email;
    if (sex == "Female") {
        sex = false;
    } else {
        sex = true;
    }
    employee.sex = sex;
    employee.address = address;
    employee.phone = phone;
    employee.username = username;
    employee.password = password;
    employee.role = role;

    let employeeModel = new Employee(employee);
    await employeeModel.save();
    return res.status(200).json({
        code: 200, 
        message: "Add employee successfull", 
        success: true});
};

const updateEmployee = async (req, res, next) => {
    const code = req.params.code;
    var {firstname, lastname, birthday, sex, address, phone, email, password} = req.body;

    const employee = await Employee.findOne({code: code});
    if (!code) {
        return res.status(404).json({
            code: 404,
            message: "Employee not found!",
            success: false
        });
    }
    employee.firstname = firstname;
    employee.lastname = lastname;
    employee.birthday = Date(birthday);
    if (sex == "Female") {
        sex = false;
    } else {
        sex = true;
    }
    employee.sex = sex;
    employee.address = address;
    employee.phone = phone;
    employee.email = email;
    employee.password = password;
    await employee.save();
    return res.status(200).json({
        code: 200,
        message: "Update employee successfull!",
        success: true
    });
};

const deleteEmployee = async (req, res, next) => {
    const code = req.params.code;
    const employee = await Employee.findOneAndDelete({code: code});
    if (!employee) {
        return res.status(404).json({
            code: 404,
            message: "Employee not found!",
            success: false
        })
    }
    return res.status(200).json({
        code: 200,
        message: "Delete employee successfull!",
        success: true
    })
};

const getAllEmployee = async (req, res, next) => {
    const employees = await Employee.find();
    return res.status(200).json({
        code: 200,
        message: "Get all employee!",
        success: true,
        employees: employees
    });
};

const getEmployeeByCode = async (req, res, next) => {
    const code = req.params.code;
    const employee = await Employee.findOne({code: code});
    if (!employee) {
        return res.status(404).json({
            code: 404,
            message: "Employee not found!",
            success: false
        })
    }
    return res.status(200).json({
        code: 200,
        message: "Get employee by code",
        success: true,
        employee: employee
    })
};

module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployee,
    getEmployeeByCode
}