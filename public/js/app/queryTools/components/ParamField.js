import React from 'react';
import lo from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var timeoutHandler = null;
var tempParam = {};
var paramHandler = {};

class DateField extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: props.defaultValue ? moment(props.defaultValue) : null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });

        onDateChange(this.props.paramKey)(date);
    }

    render() {
        return <div style={{"fontSize": "16px"}}>
            <DatePicker
                dateFormat="YYYY/MM/DD" 
                calendarClassName="datepicker-calendar"
                isClearable={true}
                key={this.props.elemKey}
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
        </div>;
    }
}

var renderParam = function({type, elemKey, paramKey, defaultValue,
    onInputChange, onDateChange
}){
    if(type === "datetime" || type === "date"){
        paramHandler[elemKey] = paramHandler[elemKey] || moment(defaultValue);
        return <div className="col-md-6 form-group">
            <label className="control-label">{ paramKey }</label>
            <DateField paramKey={paramKey} elemKey={elemKey} defaultValue={defaultValue} />
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