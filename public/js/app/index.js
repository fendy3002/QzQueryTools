import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import QzReactReduxHashState from '@fendy3002/react-redux-hash-state';

import sa from 'superagent';
import lo from 'lodash';
import Routes from './Routes.js';
import reducer from './reducers';
import QueryParamDefaultValueGenerator from './queryTools/actions/QueryParamDefaultValueGenerator.js';

var initAdminLte = () => {
    setTimeout(() => {
        var adminLteScript = document.createElement('script');
        adminLteScript.src = "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.11/js/app.min.js";
        adminLteScript.origin = "anonymous";
        document.getElementsByTagName('head')[0].appendChild(adminLteScript);
    }, 500);
};

var findQuery = (queries, selected) => {
    for(var i = 0; i < queries.length; i++){
        var query = queries[i];
        if(query.children){ 
            var tempResult = findQuery(query.children, selected);
            if(tempResult){ return tempResult; }
        }
        else{
            if(query.filePath == selected){
                return query; 
            }
        }
    }
    return null;
};

var getPreloadedRequest = (config, filter) => {
    var request = {
        selectedConnection: null,
        selectedQuery: null
    };
    if(config.connection.length === 1 && config.connection[0].locked){
        request.selectedConnection = config.connection[0];
    }
    else if(filter.selectedConnection){
        var matchConnections = lo.filter(config.connection, k => 
            k.name == filter.selectedConnection);
        if(matchConnections.length > 0){
            request.selectedConnection = matchConnections[0];
        }
    }
    
    if(request.selectedConnection){
        var matchQuery = findQuery(config.query, filter.selectedQuery);
        if(matchQuery){
            request.selectedQuery = matchQuery;
            request.params = QueryParamDefaultValueGenerator(matchQuery);
        }
    }
    return request;
};
var renderPage = function(){
    sa.get('./api/config/connection')
    .end((err, res) => {
        sa.get('./api/config/query')
        .end((err2, res2) => {
            var config = {
                connection: res.body,
                query: res2.body
            };
            var filter = Object.assign({
                    selectedConnection: "",
                    selectedQuery: ""
                }, QzReactReduxHashState.getState("filter"));
            var preloadRequest = getPreloadedRequest(config, filter);
            var state = {
                config: Object.assign({
                    connection: [],
                    query: []
                }, config),
                filter: filter,
                request: Object.assign({
                    selectedConnection: null,
                    selectedQuery: null,
                    params: {}
                }, preloadRequest)
            };
            
            var store = createStore(reducer,
                state,
                applyMiddleware(...[
                    thunk,
                    QzReactReduxHashState.middleware({filter: "filter"})
                ]));
            render(
                <Provider store={store}>
                    <Routes store={store} />
                </Provider>,
                document.getElementById('content')
            );
        });
    });
};
initAdminLte();
renderPage();