import React from 'react';
import lo from 'lodash';
import TableResult from './TableResult.js';
import ReportResult from './ReportResult.js';

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
        else if(key == "rowc"){
            return <section className="col-xs-12">
                <div className="row">
                    {renderLayout(value)}
                </div>
            </section>;
        }
        else if(key.startsWith("col-")){
            var width = key.split("-")[1];
            return <section className={"col-sm-" + width}>
                {renderLayout(value)}
            </section>;
        }
        else{
            return <ReportResult layout={{
                [key]: value
            }} data={data} />;
        }
    };
    var renderLayout = (toRender) => {
        if(!isNaN(toRender)){
            return renderNum(toRender);
        }
        else if(Array.isArray(toRender)){
            return lo.map(toRender, k=> {
                var key = Object.keys(k)[0];
                var value = k[key];
                return renderElem(key, value);
            });
        }
        else{ // object
            var key = Object.keys(toRender)[0];
            var value = toRender[key];
            return renderElem(key, value);
        }
    };

	return <div className="row">
        <div className="col-xs-12">
            {renderLayout(layout)}
        </div>
    </div>;
};

export default Elem;