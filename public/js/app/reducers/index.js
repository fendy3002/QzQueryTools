var { combineReducers } = require('redux');
var config = require('./config.js');
var filter = require('./filter.js');
var request = require('./request.js');
var toastrReducer = require('react-redux-toastr').reducer;

var app = combineReducers({
    config: config,
    filter: filter,
    request: request,
    toastr: toastrReducer
});

module.exports = app;
