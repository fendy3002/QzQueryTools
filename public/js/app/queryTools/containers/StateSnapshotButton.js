import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import {snapshot} from '../actions/index.js';

var SnapshotButton = function({
    snapshot
}){
    var onSnapshot = () => {
        snapshot();
    };
    return <button className="btn btn-flat btn-primary" type="button" onClick={onSnapshot}>
        <i className="fa fa-external-link"></i> Snapshot
    </button>;
};

var mapStateToProps = function(state){
    return {
    };
};

var mapDispatchToProps = function(dispatch, getState){
    return {
        snapshot: bindActionCreators(snapshot, dispatch)
    };
};
var StateSnapshotButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapshotButton);

export default StateSnapshotButton;
