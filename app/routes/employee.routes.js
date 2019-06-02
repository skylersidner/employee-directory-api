const employeesStub = require('../stubs/employees.stub');
const Employee = require('../models/employee.model');

let employees = [];

const routes = (app) => {

    const employeesPath = '/employees';

    if (process.env.NODE_ENV === 'dev') {
        employees = employeesStub;
    }

    app.get(employeesPath, (req, res) => {
        res.send(employees)
    });

    app.post(employeesPath, (req, res) => {
        const newEmployee = new Employee(req.body);

        const validation = Employee.validate(req.body);
        let response;
        if (validation.isValid) {
            employees.push(newEmployee);
            response = employees;
        } else {
            response = { errors: validation.errors };
        }

        res.send(response);
    });
};

module.exports = routes;
