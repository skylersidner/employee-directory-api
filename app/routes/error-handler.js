
class ErrorHandler {
  static NotFound({ response, id }) {
    const value = {
      errors: [`Item with ID ${id} could not be found.`],
      status: 404
    };
    response.status(404);

    return value;
  }

  static BadRequest({ response, requestId, itemId }) {
    const value = {
      errors: [`ID of ${requestId} in request path does not match item in body of ID ${itemId}.`],
      status: 400
    };
    response.status(400);

    return value;
  }
}


module.exports = ErrorHandler;
