import React from 'react'
import lo from 'lodash'
import sa from 'superagent';

var Elem = function({config, filter, request,
    execQuery}){
    var onClick = () => {
        var connection = 
            config.connection.length === 1 && config.connection[0].locked ? 
            config.connection[0].name :
            filter.selectedConnection;
        execQuery({
            connection: connection,
            query: filter.selectedQuery,
            params: JSON.stringify(request.params)
        });
    };
    return <div className="col-sm-12 text-right">
        {filter.selectedQuery &&
            <button type="button"
                className="btn btn-flat btn-primary"
                onClick={onClick}>
                Query
            </button>
        }
    </div>;
};

export default Elem;