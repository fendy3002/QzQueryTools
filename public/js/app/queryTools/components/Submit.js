import React from 'react'
import lo from 'lodash'
import sa from 'superagent';

var Elem = function({config, filter, request,
    execQuery}){
    var onClick = () => {
        execQuery({
            connection: filter.selectedConnection,
            query: filter.selectedQuery,
            params: JSON.stringify(request.params)
        });
    };
    return <div className="col-sm-12 text-right">
        <button type="button"
            className="btn btn-flat btn-primary"
            onClick={onClick}>
            Query
        </button>          
    </div>;
};

export default Elem;