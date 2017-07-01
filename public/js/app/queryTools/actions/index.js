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
var appendParams = exports.appendParams = function(key, value){
	var param = {};
	param[key] = value;
    return {
        type: 'APPEND_PARAMS',
        param: param
    };
};

var execQuery = exports.execQuery = function(params){
    return (dispatch, getState) => {
        sa.post('/api/exec')
            .send(params)
            .end(function(err, res){
            
        });
    };
};