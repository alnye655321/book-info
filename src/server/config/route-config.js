(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const authorRoutes = require('../routes/authors');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/v1/authors', authorRoutes);

  };

})(module.exports);
