(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const authorRoutes = require('../routes/authors');
    const bookRoutes = require('../routes/books');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/v1/authors', authorRoutes);
    app.use('/api/v1/books', bookRoutes);
  };

})(module.exports);
