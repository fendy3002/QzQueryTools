import React from 'react'

import AppTemplate from '../../sharedComponents/AppTemplate.js';
import StateResult from '../containers/StateResult.js';
import Loadable from 'react-loading-overlay';
import 'react-select/dist/react-select.css';
import ReduxToastr from 'react-redux-toastr'

var App = function({request}){
    return <div>
        <div className="content-wrapper" style={{"marginLeft":"0px"}}>
            <section className="content-header">
                <h1>
                    <b>{ request.title }</b>
                </h1>
            </section>
            <section className="content">
                <StateResult />
            </section>
        </div>

        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar />
    </div>;
};

export default App;
