import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import {setSelectedConnection} from '../actions/index.js';
import Component from '../components/Connections.js';

var mapStateToProps = function(state){
    return {
        config: state.config,
        filter: state.filter
    };
};

var mapDispatchToProps = function(dispatch, getState){
    return {
        setSelectedConnection: bindActionCreators(setSelectedConnection, dispatch)
    };
};
var StateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default StateComponent;
