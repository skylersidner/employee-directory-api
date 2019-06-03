const {assignWith} = require('lodash');

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
    const validation = Employee.validatePost(req.body);

    let response;

    if (validation.isValid) {
      const newEmployee = new Employee(req.body);
      employees.push(newEmployee);
      response = employees;
    } else {
      response = {errors: validation.errors};
    }

    res.send(response);
  });

  app.put(employeesPath, (req, res) => {
    const updatedEmployee = req.body;

    const validation = Employee.validatePut(updatedEmployee);
    let response;

    if (validation.isValid) {
      const currentEmployee = employees.find(emp => emp.id === updatedEmployee.id);

      if (!currentEmployee) {
        response = {errors: [`Item with ID ${updatedEmployee.id} could not be found.`]}
      } else {

        const customizer = (objValue, srcValue, key, object, source) => {
          return (key === 'id' || key === 'dateAdded') ? objValue : srcValue;
        };

        assignWith(currentEmployee, updatedEmployee, customizer);
        response = employees.find(emp => emp.id === updatedEmployee.id);
      }
    } else {
      response = {errors: validation.errors};
    }

    res.send(response)
  });
};

module.exports = routes;
