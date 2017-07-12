import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import sa from 'superagent';
import lo from 'lodash';
import App from './watchTools/containers/StateApp.js';
import {execQuery} from './watchTools/actions/index.js';
import reducer from './reducers';

var initAdminLte = () => {
    setTimeout(() => {
        var adminLteScript = document.createElement('script');
        adminLteScript.src = "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.11/js/app.min.js";
        adminLteScript.origin = "anonymous";
        document.getElementsByTagName('head')[0].appendChild(adminLteScript);
    }, 500);
};

var renderPage = function(context){
    window.context = window.context || {};
    var filter = {
            selectedConnection: context.connection,
            selectedQuery: context.query
        };
    var state = {
        config: {
            connection: [],
            query: []
        },
        filter: filter,
        request: {
            selectedConnection: null,
            selectedQuery: null,
            title: context.title
        }
    };
    var store = createStore(reducer,
        state,
        applyMiddleware(...[
            thunk
            //QzReactReduxHashState.middleware({filter: "filter"})
        ]));
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('content')
    );

    store.dispatch(execQuery({
        connection: filter.selectedConnection,
        query: filter.selectedQuery,
        params: JSON.stringify(window.context.params)
    }));
    if(context.interval > 0){
        setTimeout(() => {
            setInterval(() => {
                store.dispatch(execQuery({
                    connection: filter.selectedConnection,
                    query: filter.selectedQuery,
                    params: JSON.stringify(window.context.params)
                }));
            }, context.interval);
        }, 500);
    }
};
initAdminLte();
renderPage(window.context || {});