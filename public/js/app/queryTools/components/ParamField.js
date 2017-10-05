import React from 'react';
import lo from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var timeoutHandler = null;
var tempParam = {};
var paramHandler = {};

var renderParam = function({type, elemKey, paramKey, defaultValue,
    onInputChange, onDateChange
}){
    if(type === "datetime" || type === "date"){
        paramHandler[elemKey] = paramHandler[elemKey] || moment(defaultValue);
        return <div className="col-md-6 form-group">
            <label className="control-label">{ paramKey }</label>
            <div className="input-group date">
                <div className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                </div>
                <DatePicker 
                    dateFormat="YYYY/MM/DD" 
                    isClearable={true}
                    selected={ paramHandler[elemKey] }
                    onChange={ (date) => {
                        paramHandler[elemKey] = date;
                        onDateChange(paramKey)(date);
                    } }
                    key={elemKey}/>
            </div>
        </div>;
    }
    else{
        return <div className="col-md-6 form-group">
            <label className="control-label">{paramKey}</label>
            <input className="form-control" onChange={onInputChange(paramKey)}
                key={elemKey} defaultValue={ defaultValue }/>
        </div>;
    }
};

var ParamField = function({request, paramKey, paramOpt, defaultValue,
    appendParams}){
    var onInputChange = (key) => (event) => {
        var input = event.target;
        onChange(key, input.value);
    };
    
    var onDateChange = (key) => (date) => {
        onChange(key, date.format('YYYY/MM/DD'));
    };

    var onChange = (key, inputValue) => {
        tempParam[key] = inputValue;
        if(timeoutHandler){ clearTimeout(timeoutHandler); }
        timeoutHandler = setTimeout(() => {
            lo.forOwn(tempParam, (value, key) => {
                appendParams(key, value);
            });
            tempParam = {};
        }, 150);
    };

    var elemKey = request.selectedQuery.filePath + paramKey;

    if(!paramOpt){
        return null;
    }
    else if(typeof paramOpt === "string" || paramOpt instanceof String){
        return renderParam({
            type: paramOpt,
            elemKey: elemKey, 
            paramKey: paramKey,
            defaultValue: "",
            onInputChange: onInputChange,
            onDateChange: onDateChange
        });
    }
    else{
        var type = paramOpt.type;

        return renderParam({
            type: type,
            elemKey: elemKey, 
            paramKey: paramKey,
            defaultValue: defaultValue,
            onInputChange: onInputChange,
            onDateChange: onDateChange
        });
    }
};

export default ParamField;