import React from 'react'
import lo from 'lodash'
import sa from 'superagent';
import StateSnapshotButton from '../containers/StateSnapshotButton.js';
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
        var watchValue = "0";
        var watchOpt = [
            { value: "0", label: "Do not refresh"}
            ];
        if(request.selectedQuery.head.canWatch){
            watchOpt = watchOpt.concat([
                { value: "500", label: "0.5 sec"},
                { value: "1000", label: "1 sec"},
                { value: "3000", label: "3 sec"},
                { value: "5000", label: "5 sec"},
                { value: "10000", label: "10 sec"}
            ]);
            watchValue = "1000";
        }

        var watchOptDom = lo.map(watchOpt, opt => {
            return <option value={opt.value}>{opt.label}</option>
        });

        return <div>
            {tableDoms}
            <div className="row">
                <div className="box box-solid">
                    <div className="box-body">
                        <div className="row">
                            <div className="col-sm-12 text-right">
                                <form action={url} method="post" target="_blank" className="form form-inline">
                                    <select className="form-control" name="interval" style={{"marginRight": "8px"}} defaultValue={watchValue}>
                                        { watchOptDom }
                                    </select>
                                    <button className="btn btn-flat btn-primary" 
                                        type="submit"><i className="fa fa-external-link"></i> Watch</button>
                                    <input type="hidden" name="params" defaultValue={JSON.stringify(request.execParams)} />
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-right">
                                <StateSnapshotButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
};

export default Elem;