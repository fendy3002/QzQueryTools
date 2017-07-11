import React from 'react';
import lo from 'lodash';

var Elem = function({data, layout}){
    var fields = layout.fields || {};
    var renderLayout = (key, row) => {
        var rowType = fields[key];
        if(!rowType){
            return <input className="form-control" readOnly="readOnly"
                defaultValue={row.value} />;
        }
        else if(rowType == "bool" || rowType == "boolean"){
            return <input type="checkbox" readOnly="readOnly"
                disabled="disabled"
                defaultChecked={row.value} />;
        }
        else if(rowType == "textarea"){
            return <textarea className="form-control" rows={7} readOnly="readOnly"
                defaultValue={row.value}/>;
        }
    };
    var formDom = lo.map(data.data, row=> {
        var key = row.key || row.label;
        return <div className="form-group">
            <label className="col-sm-4 control-label">{key}</label>
            <div className="col-sm-8">
                {renderLayout(key, row)}
            </div>
        </div>
    });
    return <div className="col-xs-12">
        <form className="form form-horizontal">
            {formDom}
        </form>
    </div>;
};

export default Elem;