import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import {setSelectedQuery} from '../actions/index.js';
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
        setSelectedQuery: bindActionCreators(setSelectedQuery, dispatch)
    };
};
var StateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default StateComponent;
