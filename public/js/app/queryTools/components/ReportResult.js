import React from 'react';
import lo from 'lodash';
import Line from './reports/Line.js';
import Bar from './reports/Bar.js';
import Column from './reports/Column.js';
import Summary from './reports/Summary.js';

var Elem = function({layout, data}){
    var key = Object.keys(layout)[0];
    var value = layout[key];
    
    var render = null;
    var label = null;
    if(lo.includes(['line', 'bar', 'column'], key)){
        var selectedData = null;
        label = value.label;
        if(Array.isArray(value.script)){
            selectedData = value.script.map(k=> data[k - 1]);
        }
        else{ // value is int
            selectedData = [data[value.script - 1]];
        }
        if(key == 'line'){
            render = <Line data={selectedData} x={value.x} y={value.y} layout={value}/>;
        }
        else if(key == 'bar'){
            render = <Bar data={selectedData} x={value.x} y={value.y} layout={value}/>;
        }
        else if(key == "column"){
            render = <Column data={selectedData} x={value.x} y={value.y} layout={value}/>;
        }
    }
    else if(key == "summary"){
        var selectedData = data[value.script - 1];
        label = selectedData.label;
        render = <Summary data={selectedData} layout={layout[key]}/>;
    }
    return <div className="box">
        <div className="box-header with-border">
            <h3 className="box-title">{label}</h3>
        </div>
        <div className="box-body no-padding">
            {render}
        </div>
    </div>;
};

export default Elem;