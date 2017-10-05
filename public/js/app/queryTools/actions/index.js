import sa from 'superagent';
import lo from 'lodash';
import {toastr} from 'react-redux-toastr';
import QueryParamDefaultValueGenerator from './QueryParamDefaultValueGenerator.js';

var setSelectedConnection = exports.setSelectedConnection = function(connection){
    return {
        type: 'SET_SELECTED_CONNECTION',
        connection: connection
    };
};
var setSelectedQuery = exports.setSelectedQuery = function(query){
    return {
        type: 'SET_SELECTED_QUERY',
        query: query,
        params: QueryParamDefaultValueGenerator(query)
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

var execQuery = exports.execQuery = function(){
    return (dispatch, getState) => {
        var { config, filter, request } = getState();
        var connection = 
            config.connection.length === 1 && config.connection[0].locked ? 
            config.connection[0].name:
            filter.selectedConnection;
        var postParams = {
            connection: connection,
            query: filter.selectedQuery,
            params: JSON.stringify(request.params)
        };
        loading(dispatch, done => {
            sa.post('/api/exec')
                .send(postParams)
                .end(function(err, res){
                    if(err){
                        toastr.error(res.body.message);
                    }
                    dispatch({
                        type: "SET_EXEC_RESULT",
                        result: res.body.data,
                        query: res.body.query,
                        params: res.body.params
                    });
                    done();
                });
        });
    };
};

var snapshot = exports.snapshot = function(){
    return (dispatch, getState) => {
        var {server, request, filter} = getState();

        sa.post('/api/snapshot')
            .send({
                params: JSON.stringify(request.execParams || {}),
                results: JSON.stringify(request.execResult || {}),
                connection: filter.selectedConnection,
                query: filter.selectedQuery
            })
            .end(function(err, res){
                if(err){
                    toastr.error(res.body.message);
                }
                window.open("/snapshot?uuid=" + res.body.uuid, '_blank');
            });
    };
};

var loading = exports.loading = function(dispatch, callback){
    dispatch({
        type: "SET_LOADING",
        isLoading: true
    });
    callback(() => {
        dispatch({
            type: "SET_LOADING",
            isLoading: false
        });
    });
}