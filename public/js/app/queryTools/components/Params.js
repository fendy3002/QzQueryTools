import React from 'react'
import lo from 'lodash'
var timeoutHandler = null;
var Elem = function({config, filter, request,
	appendParams}){
    var paramDom = [];
    if(request.selectedQuery){
        var onChange = key => event => {
            var input = event.target;
            if(timeoutHandler){ clearTimeout(timeoutHandler); }
            timeoutHandler = setTimeout(() => {
                appendParams(key, input.value);
            }, 150);
        };
        lo.forOwn(request.selectedQuery.head.params,
            (value, key) => {
                paramDom.push(<div className="form-group">
                    <label className="control-label">{key}</label>
                    <input className="form-control" onChange={onChange(key)}/>
                </div>);
            });
    };
	return <div>
        {paramDom}
    </div>;
};

export default Elem;