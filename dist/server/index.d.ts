declare let sequelize: any;
/**
 * Initialize query database executor.
 * Query configuration is the query to be executed to database
 * while render configuration will return pre-processed template for further render
 *
 * @param {Object} db Sequelize database instance
 * @param {string} queryConfiguration content of query configuration
 * @param {string} renderConfiguration content of render / template configuration
 */
declare let index: (db: any, queryConfiguration: string, renderConfiguration: string) => (param: any) => (resolve: any, reject: any) => void;
