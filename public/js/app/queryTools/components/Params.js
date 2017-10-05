import React from 'react';
import lo from 'lodash';

import ParamField from './ParamField.js';
import QueryParamDefaultValueGenerator from '../actions/QueryParamDefaultValueGenerator.js';

var Elem = function({config, filter, request,
	appendParams}){
    var paramDom = [];
    if(request.selectedQuery){
        var queryParams = request.params;
        lo.forOwn(request.selectedQuery.head.params,
            (value, key) => {
                paramDom.push(<ParamField request={request} paramOpt={value} paramKey={key} defaultValue={queryParams[key]}
                    appendParams={appendParams}/>);
            });
    };
	return <div>
        {paramDom}
    </div>;
};

export default Elem;