import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import {execQuery} from '../actions/index.js';
import Component from '../components/Submit.js';

var mapStateToProps = function(state){
    return {
        config: state.config,
        filter: state.filter,
        request: state.request
    };
};

var mapDispatchToProps = function(dispatch, getState){
    return {
        execQuery: bindActionCreators(execQuery, dispatch)
    };
};
var StateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default StateComponent;
