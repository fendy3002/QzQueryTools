import React from 'react'
import RSelect from 'react-select';
import Highlighter from 'react-highlight-words';

var Elem = function({config, filter, request,
	setSelectedConnection}){
	var searchKeyword = {value: ""};
    var renderOption = option => {
        return <Highlighter
             	searchWords={[searchKeyword.value]}
              	textToHighlight={option.driver + "-" + option.name + "-" + option.host}
        	/>;
    };
    var renderValue = option => {
        return <span><strong>{option.driver}</strong>-{option.name}-{option.host}</span>
    };
    var filterOption = function(op, filterValue) {
        return op.driver.toLowerCase().search(filterValue) > -1
            || op.name.toLowerCase().search(filterValue) > -1
            || op.host.toLowerCase().search(filterValue) > -1
            || (option.driver.toLowerCase() + "-" + option.name.toLowerCase() + "-" + 
            	option.host.toLowerCase()).search(filterValue) > -1;
    };

    return <RSelect options={config.connection}
        onChange={setSelectedConnection}
        onInputChange={k=> searchKeyword.value = k}
        valueRenderer={renderValue}
        optionRenderer={renderOption}
        value={request.selectedConnection}
        clearable={false}
        filterOption={filterOption}></RSelect>
};

export default Elem;