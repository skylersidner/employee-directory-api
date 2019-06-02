const uuidv4 = require('uuid/v4');

class Employee {
  constructor({ imageUrl, firstName, lastName, title }) {
    this.imageUrl = imageUrl || '';
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateAdded = new Date();
    this.title = title || 'Employee';
    this.id = uuidv4();
  }

  static validate(classObject) {
    const errors = [];
    let isValid = true;
    if (!classObject.firstName || !classObject.lastName) {
      isValid = false;
      errors.push('firstName and lastName are required.')
    }

    // TODO: make this more robust by notifying if attributes are present that aren't on the model;
    // have to abstract this for all models;

    return { isValid, errors }
  }
}

module.exports = Employee;
