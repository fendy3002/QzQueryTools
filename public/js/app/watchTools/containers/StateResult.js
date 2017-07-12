import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import {} from '../actions/index.js';
import Component from '../components/Result.js';

var mapStateToProps = function(state){
    return {
        request: state.request
    };
};

var mapDispatchToProps = function(dispatch, getState){
    return {
        
    };
};
var StateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default StateComponent;
