let sequelize = require('sequelize');

/**
 * Initialize query database executor. 
 * Query configuration is the query to be executed to database
 * while render configuration will return pre-processed template for further render 
 * 
 * @param {Object} db Sequelize database instance
 * @param {string} queryConfiguration content of query configuration
 * @param {string} renderConfiguration content of render / template configuration
 */
let index = (db: any, queryConfiguration: string, renderConfiguration: string) => {
    
    /**
     * Execute query based on configuration, using param provided
     * 
     * @param {Object} param key value object
     */
    let serverExecutor = (param: any) => (resolve, reject) => {
        db.query(queryConfiguration, 
            param, 
            {type: sequelize.QueryTypes.SELECT})
        .then(() => {
            
        });
    };
    return serverExecutor;
};

module.exports = index;