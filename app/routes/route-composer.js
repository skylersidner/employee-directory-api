const fs = require('fs');

//TODO: this context difference is pretty terribad; figure out a better way
const composeRoutes = (app) => {
  // root is relative to the context of this method being invoked (in index.js)...
  fs.readdir('./app/routes', (err, files) => {
    console.log('err: ', err);

    const routeFiles = files.filter(fileName => fileName.includes('.routes.js'));

    routeFiles.forEach(fileName => {

      // root is relative to this file
      const routesPath = `./${fileName}`;
      const routes = require(routesPath);

      //set each route...
      routes(app);
    });
  });
};

module.exports = composeRoutes;
