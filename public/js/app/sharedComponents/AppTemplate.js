import React from 'react'
import TopNav from './TopNav.js';
import SideBar from './SideBar.js';
import ReduxToastr from 'react-redux-toastr'

var AppTemplate = function({children}){
    var host = location.protocol + "//" + window.location.host;
    return <div>
        <TopNav host={host} />
        <SideBar host={host} />
        <div className="content-wrapper">
            {children}
        </div>
        <footer className="main-footer">
            <strong>
                <span>View my repo at: </span>
                <a href="https://github.com/fendy3002/QzStringTools">https://github.com/fendy3002/QzStringTools</a>
            </strong>
        </footer>

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

export default AppTemplate;
