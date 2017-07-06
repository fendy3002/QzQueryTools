import React from 'react'
import lo from 'lodash'
import sa from 'superagent';

var Elem = function({request}){
    var renderTable = (table) => {
        return <div className="box">
            <div className="box-header with-border">
                <h3 className="box-title">{table.label}</h3>
                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                        <i className="fa fa-minus"></i>
                    </button>
                </div>
            </div>
            <div className="box-body no-padding">
                <table className="table table-responsive table-condensed table-striped table-bordered">
                    {renderHead(table.fields)}
                    {renderData(table.data, table.fields)}
                </table>
            </div>
        </div>;
    };
    var renderHead = (fields) => {
        var fieldDoms = lo.map(fields, k=> (
            <th>{k}</th>
        ));
        return <thead>
            <tr>
                {fieldDoms}
            </tr>
        </thead>;
    };
    var renderTd = (row, fields) => {
        return lo.map(fields, k=> {
            return <td>{row[k]}</td>;
        });
    };
    var renderData = (data, fields) => {
        var trList = lo.map(data, row => {
            return <tr>{renderTd(row, fields)}</tr>;
        });

        return <tbody>{trList}</tbody>;
    };
    if(!request.execResult){
        return <div></div>;
    }
    var tableDoms = lo.map(request.execResult, k=> {
        return renderTable(k);
    });
    return <div>
        {tableDoms}
    </div>;
};

export default Elem;