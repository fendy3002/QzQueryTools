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

        var url = "./watch/" +
            encodeURIComponent(request.selectedConnection.name) + "/" +
            encodeURIComponent(request.selectedQuery.filePath);
        return <div>
            {tableDoms}
            <form action={url} method="post" target="_blank" className="form form-inline">
                <div className="row">
                    <div className="box box-solid">
                        <div className="box-body">
                            <div className="text-right">
                                <select className="form-control" name="interval" style={{"marginRight": "8px"}}>
                                    <option value="500">0.5 sec</option>
                                    <option value="1000" selected>1 sec</option>
                                    <option value="3000">3 sec</option>
                                    <option value="5000">5 sec</option>
                                    <option value="10000">10 sec</option>
                                </select>
                                <button className="btn btn-flat btn-primary" 
                                    type="submit"><i className="fa fa-external-link"></i> Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="params" defaultValue={JSON.stringify(request.execParams)} />
            </form>
        </div>;
    }
};

export default Elem;