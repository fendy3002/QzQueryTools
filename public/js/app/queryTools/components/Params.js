import React from 'react'
import lo from 'lodash'
var timeoutHandler = null;
var Elem = function({config, filter, request,
	appendParams}){
    var paramDom = [];
    var tempParam = {};
    if(request.selectedQuery){
        var onChange = key => event => {
            var input = event.target;
            tempParam[key] = input.value;
            if(timeoutHandler){ clearTimeout(timeoutHandler); }
            timeoutHandler = setTimeout(() => {
                lo.forOwn(tempParam, (value, key) => {
                    appendParams(key, value);
                });
                tempParam = {};
            }, 150);
        };
        lo.forOwn(request.selectedQuery.head.params,
            (value, key) => {
                paramDom.push(<div className="form-group">
                    <label className="control-label">{key}</label>
                    <input className="form-control" onChange={onChange(key)}
                        key={request.selectedQuery.filePath + key}/>
                </div>);
            });
    };
	return <div>
        {paramDom}
    </div>;
};

export default Elem;