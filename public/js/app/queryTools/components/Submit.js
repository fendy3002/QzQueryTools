import React from 'react'
import lo from 'lodash'

var Elem = function({config, filter, request,
    appendParams}){
    var onClick = () => {
        console.log(request);
    };
    return <div className="col-sm-12 text-right">
        <button className="btn btn-flat btn-primary"
            onClick={onClick}>
            Query
        </button>          
    </div>;
};

export default Elem;