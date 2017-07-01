import React from 'react'
import lo from 'lodash'
import sa from 'superagent';

var Elem = function({request}){
    var renderTable = (table) => {
        return <div className="box">
            <div className="box-header">
                <h3>{table.label}</h3>
            </div>
            <div className="box-body">
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