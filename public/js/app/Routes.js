import React from 'react';
import {
        BrowserRouter as Router,
        Route,
        Link
    } from 'react-router-dom';

import HomeApp from './queryTools/containers/StateApp.js';
//import ConfigApp from './configList/components/App.js';
import AboutApp from './about/components/App.js';

var Routes = function(){
    var host = location.protocol + "//" + window.location.host;
    return <Router>
        <div>
            <Route exact path="/" component={HomeApp}/>
            <Route path="/about" component={AboutApp}/>
        </div>
    </Router>;
};

export default Routes;
/*
            <Route path="/config" component={ConfigApp}/>
*/