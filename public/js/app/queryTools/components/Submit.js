import React from 'react'
import lo from 'lodash'
import sa from 'superagent';

var Elem = function({config, filter, request,
    execQuery}){
    var onClick = () => {
        execQuery();
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