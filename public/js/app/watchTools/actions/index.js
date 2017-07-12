import sa from 'superagent';
import lo from 'lodash';
import {toastr} from 'react-redux-toastr'

var execQuery = exports.execQuery = function(params){
    return (dispatch, getState) => {
        sa.post('/api/exec')
            .send(params)
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
            });
    };
};