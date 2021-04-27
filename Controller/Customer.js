const Customer = require('../DB/Customer');

const addCustomer = async(req, res, next) =>{
    var{code, firstname, lastname, birthday, sex, address, phone, email, totalmoney, visit, level, purchase} = req.body;
    const checkCode = await Customer.findOne({code: code});
    if(checkCode) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Code customer already exists!",
          });
    }

    let customer = {};
    customer.code = code;
    customer.firstname = firstname;
    customer.lastname = lastname;
    customer.birthday = Date(birthday);
    if (sex == "Female") {
        sex = false;
    } else {
        sex = true;
    }
    customer.sex = sex;
    customer.address = address;
    customer.phone = phone;
    customer.email = email;
    customer.totalmoney = totalmoney;
    customer.visit = Number(visit);
    customer.level = level;
    customer.purchase = Number(purchase);

    let customerModel = new Customer(customer);
    await customerModel.save();
    return res.status(200).json({
        code: 200, 
        message: "Add customer successfull", 
        success: true});
};

const updateCustomer = async (req, res, next) => {
    const code = req.params.code;
    var {firstname, lastname, birthday, sex, address, phone, email, totalmoney, visit, level, purchase} = req.body;

    const customer = await Customer.findOne({code: code});
    if (!customer) {
        return res.status(404).json({
            code: 404, 
            message: "Customer not found!", 
            success: false});
    } 

    customer.firstname = firstname;
    customer.lastname = lastname;
    customer.birthday = birthday;
    if (sex == "Female") {
        sex = false;
    } else {
        sex = true;
    }
    customer.sex = sex;
    customer.address = address;
    customer.phone = phone;
    customer.email = email;
    customer.totalmoney = totalmoney;
    customer.visit = Number(visit);
    customer.level = level;
    customer.purchase = Number(purchase);

    await customer.save();
    return res.status(200).json({
        code: 200,
        message: "Update customer succesfull!",
        success: true
    });
};

const deleteCustomer = async (req, res, next) => {
    const code = req.params.code;
    const customer = await Customer.findOneAndDelete({code: code});
    if (!customer) {
        return res.status(404).json({
            code: 404,
            message: "Customer not found!",
            success: false
        });
    }
    return res.status(200).json({
        code: 200,
        message: "Delete customer successfully!",
        success: true
    });
};

const getAllCustomer = async (req, res, next) => {
    const customers = await Customer.find();
    return res.status(200).json({
        code: 200,
        message: "Get all customer!",
        success: true,
        customers: customers
    });
};

const getCustomerByCode = async (req, res, next) => {
    const code = req.params.code;
    const customer  = await Customer.findOne({code: code});
    if (!customer) {
        return res.status(404).json({
            code: 404,
            message: "Customer not found!",
            success: false
        });
    }
    return res.status(200).json({
        code: 200,
        message: "Get one customer by code",
        success: true,
        customer: customer
    });
};

module.exports = {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer,
    getCustomerByCode
};