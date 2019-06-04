const {assignWith} = require('lodash');

const employeesStub = require('../stubs/employees.stub');
const Employee = require('../models/employee.model');
const ErrorHandler = require('./error-handler');

let employees = [];

const routes = (app) => {

  const employeesPath = '/employees';

  if (process.env.NODE_ENV === 'dev') {
    employees = employeesStub;
  }

  app.get(employeesPath, (request, response) => {
    response.send(employees)
  });

  app.post(employeesPath, (request, response) => {
    const validation = Employee.validatePost(request.body);

    let result;

    if (validation.isValid) {
      const newEmployee = new Employee(request.body);
      employees.push(newEmployee);
      result = employees;
    } else {
      result = { errors: validation.errors };
    }

    response.send(result);
  });

  app.put(`${employeesPath}/:id`, (request, response) => {
    const updatedEmployee = request.body;

    const validation = Employee.validatePut(updatedEmployee);
    let result;

    if (validation.isValid) {
      const currentEmployee = employees.find(emp => emp.id === updatedEmployee.id);

      if (!currentEmployee) {
        result = ErrorHandler.NotFound({ response, id: updatedEmployee.id });
      } else if(request.params.id !== currentEmployee.id) {
        result = ErrorHandler.BadRequest({ response, requestId: request.params.id, itemId: currentEmployee.id })
      } else {
        const customizer = (objValue, srcValue, key, object, source) => {
          return (key === 'id' || key === 'dateAdded') ? objValue : srcValue;
        };

        assignWith(currentEmployee, updatedEmployee, customizer);
        result = employees.find(emp => emp.id === updatedEmployee.id);
      }
    } else {
      result = { errors: validation.errors };
    }

    response.send(result)
  });

  app.delete(`${employeesPath}/:id`, (request, response) => {
    const idToDelete = request.params.id;

    const employee = employees.find(emp => emp.id === idToDelete);
    let result;

    if (!employee) {
      result = ErrorHandler.NotFound({ response, id: idToDelete })
    } else {
      employees = employees.filter(emp => emp.id !== idToDelete);
      result = employee;
    }

    response.send(result)
  });
};

module.exports = routes;
