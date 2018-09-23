var sequelize = require('sequelize');
/**
 * Initialize query database executor.
 * Query configuration is the query to be executed to database
 * while render configuration will return pre-processed template for further render
 *
 * @param {Object} db Sequelize database instance
 * @param {string} queryConfiguration content of query configuration
 * @param {string} renderConfiguration content of render / template configuration
 */
var index = function (db, queryConfiguration, renderConfiguration) {
    /**
     * Execute query based on configuration, using param provided
     *
     * @param {Object} param key value object
     */
    var serverExecutor = function (param) { return function (resolve, reject) {
        db.query(queryConfiguration, param, { type: sequelize.QueryTypes.SELECT })
            .then(function () {
        });
    }; };
    return serverExecutor;
};
module.exports = index;
