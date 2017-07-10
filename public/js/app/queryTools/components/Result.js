import React from 'react'
import lo from 'lodash'
import sa from 'superagent';
import LayoutResult from './LayoutResult.js';
import TableResult from './TableResult.js';

var Elem = function({request}){
    if(!request.execResult){
        return <div></div>;
    }
    else{
        var selectedQuery = request.execQuery;
        var tableDoms = null;
        if(selectedQuery.head.layout){
            tableDoms = <LayoutResult layout={selectedQuery.head.layout} data={request.execResult}/>;
        }
        else{
            tableDoms = lo.map(request.execResult, k=> {
                return <TableResult table={k} />
            });
        }
        return <div>
            {tableDoms}
        </div>;
    }
};

export default Elem;