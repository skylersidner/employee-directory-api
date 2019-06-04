const uuidv4 = require('uuid/v4');

const requestTypeEnum = Object.freeze({ POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete' });

// based on this article: https://webbjocke.com/javascript-check-data-types/
const isValidType = (value, type) => {
  let isValid = false;

  //TODO: add all type cases
  switch (type) {
    case 'string':
      if (typeof value === 'string' || value instanceof String) {
        isValid = true;
      }
      break;
    case 'date':
      if (new Date(value) instanceof Date) {
        isValid = true;
      }
      break;
    default:
      console.log(`Type validation could not recognize the passed type: ${type}.`);
  }

  return isValid;
};

class Employee {
  constructor({ imageUrl, firstName, lastName, title }) {
    this.imageUrl = imageUrl || '';
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateAdded = new Date().getTime();
    this.title = title || 'Employee';
    this.id = uuidv4();
  }

  static AttributeDefinitions() {
    return {
      imageUrl: { type: 'string', required: [ requestTypeEnum.PUT ] },
      firstName: { type: 'string', required: [ requestTypeEnum.POST, requestTypeEnum.PUT ] },
      lastName: { type: 'string', required: [ requestTypeEnum.POST, requestTypeEnum.PUT ] },
      dateAdded: { type: 'date', required: [ requestTypeEnum.PUT ] },
      title: { type: 'string', required: [ requestTypeEnum.PUT ] },
      id: { type: 'string', required: [ requestTypeEnum.PATCH, requestTypeEnum.PUT, requestTypeEnum.DELETE ]}
    };
  }

  static validatePost(classObject) {
    const errors = [];
    let isValid = true;

    if (!classObject.firstName || !classObject.lastName) {
      isValid = false;
      errors.push('FirstName and lastName are required.')
    }

    if (classObject.id) {
      isValid = false;
      errors.push('New objects cannot have an ID.')
    }

    // TODO: make this more robust by notifying if attributes are present that aren't on the model;
    // have to abstract this for all models;

    return { isValid, errors };
  }

  static validatePut(classObject) {
    const errors = [];
    let isValid = true;
    const definitions = Employee.AttributeDefinitions();

    Object.keys(definitions).forEach( key => {
      const definition = definitions[key];
      const value = classObject[key];

      if (definition.required.includes(requestTypeEnum.PUT)
          && (!classObject.hasOwnProperty(key) || value === null || value === undefined)) {
        isValid = false;
        errors.push(`${key} is required for ${requestTypeEnum.PUT.toUpperCase()} requests.`);
      }

      if (value && !isValidType(value, definition.type)) {
        isValid = false;
        errors.push(`${key} with a value of ${value} is not of valid type: ${definition.type}`);
      }
    });

    return { isValid, errors };
  }

}

module.exports = Employee;
