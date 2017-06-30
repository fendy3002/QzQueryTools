import React from 'react'

import AppTemplate from '../../sharedComponents/AppTemplate.js';
import StateConnections from '../containers/StateConnections.js';
import StateQueries from '../containers/StateQueries.js';
import StateParams from '../containers/StateParams.js';

import 'react-select/dist/react-select.css';

var App = function(){
    return <AppTemplate>
        <section className="content-header">
            <h1>
                <b>Query Tools</b>
            </h1>
        </section>
        <section className="content">
	        <div className="box box-primary">
	        	<div className="box-body">
	        		<form className="form">

	        			<div className="row">
	        				<div className="col-sm-12">
		        				<div className="form-group">
			        				<label className="control-label">Connection</label>
				        			<StateConnections />
			        			</div>
	        				</div>
	        			</div>
	        			<div className="row">
	        				<div className="col-sm-6">
	        					<div className="form-group">
			        				<label className="control-label">Query</label>
	        						<StateQueries />
	        					</div>
	        				</div>
	        				<div className="col-sm-6">
	        					<div className="form-group">
			        				<label className="control-label">Params</label>
	        						<StateParams />
	        					</div>
	        				</div>
	        			</div>
	        		</form>
	        	</div>
	        </div>
        </section>
    </AppTemplate>;
};

export default App;
