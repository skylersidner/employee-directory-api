const fs = require('fs');

//TODO: this context difference is pretty terribad; figure out a better way
const composeRoutes = (app) => {
  // root is relative to the context of app being called...
  fs.readdir('./app/routes', (err, files) => {
    console.log('err: ', err);

    files.forEach(file => {
      console.log(file);
      // root is relative to this file
      const routesPath = `../routes/${file}`;
      const routes = require(routesPath);
      //set each route...
      routes(app);
    });
  });
};

module.exports = composeRoutes;
