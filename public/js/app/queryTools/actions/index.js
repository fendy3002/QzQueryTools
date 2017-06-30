import sa from 'superagent';
import lo from 'lodash';

var setSelectedConnection = exports.setSelectedConnection = function(connection){
    return {
        type: 'SET_SELECTED_CONNECTION',
        connection: connection
    };
};
var setSelectedQuery = exports.setSelectedQuery = function(query){
    return {
        type: 'SET_SELECTED_QUERY',
        query: query
    };
};