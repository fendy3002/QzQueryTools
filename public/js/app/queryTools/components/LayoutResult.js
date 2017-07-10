import React from 'react';
import lo from 'lodash';
import TableResult from './TableResult.js';

var Elem = function({layout, data}){
    var renderNum = (num) => {
        var selectedData = data[num - 1];
        return <TableResult table={selectedData} />;
    };
    var renderElem = (key, value) => {
        if(key == "row"){
            return <div className="row">
                {renderLayout(value)}
            </div>;
        }
        else if(key.startsWith("col")){
            var width = key.split("-")[1];
            return <section className={"col-sm-" + width}>
                {renderLayout(value)}
            </section>;
        }
    };
    var renderLayout = (toRender) => {
        if(!isNaN(toRender)){
            return renderNum(toRender);
        }
        else{
            return lo.map(toRender, k=> {
                var key = Object.keys(k)[0];
                var value = k[key];
                return renderElem(key, value);
            });
        }
    };
	return <div className="row">
        {renderLayout(layout)}
    </div>;
};

export default Elem;