import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import QzReactReduxHashState from '@fendy3002/react-redux-hash-state';

import sa from 'superagent';
import Routes from './Routes.js';
import reducer from './reducers';

var renderPage = function(initialState){
    var state = {
        config: {
            connection: [],
            query: []
        },
        filter: Object.assign({
            selectedConnection: "",
            selectedQuery: ""
        }, QzReactReduxHashState.getState("filter"))
    };
    
    var store = createStore(reducer,
        state,
        applyMiddleware(...[
            thunk,
            QzReactReduxHashState.middleware({filter: "filter"})
        ]));
    render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById('content')
    );

    setTimeout(() => {
        var adminLteScript = document.createElement('script');
        adminLteScript.src = "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.11/js/app.min.js";
        adminLteScript.origin = "anonymous";
        document.getElementsByTagName('head')[0].appendChild(adminLteScript);

    }, 500);

    sa.get('./api/config/connection')
    .end((err, res) => {
        sa.get('./api/config/query')
        .end((err2, res2) => {
            store.dispatch({
                type: 'SET_CONFIG',
                config: {
                    connection: res.body,
                    query: res2.body
                }
            });
        });
    });
};
renderPage([]);
