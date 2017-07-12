import React from 'react'

import AppTemplate from '../../sharedComponents/AppTemplate.js';
import StateConnections from '../containers/StateConnections.js';
import StateQueries from '../containers/StateQueries.js';
import StateParams from '../containers/StateParams.js';
import StateSubmit from '../containers/StateSubmit.js';
import StateResult from '../containers/StateResult.js';
import Loadable from 'react-loading-overlay';
import 'react-select/dist/react-select.css';

var App = function({request}){
	var label = "";
	if(request.selectedQuery){
		label = request.selectedQuery.head.error ?
			request.selectedQuery.head.error :
			request.selectedQuery.head.description;
	}
    return <AppTemplate>
        <section className="content-header">
            <h1>
                <b>Query Tools</b>
            </h1>
        </section>
        <section className="content">
			<Loadable
				active={request.isLoading}
				spinner={true}
				animate={false}
				background="white"
				color="black"
				spinnerSize="128px">
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
								<div className="col-sm-4">
									<div className="form-group">
										<label className="control-label">Query</label>
										<StateQueries />
									</div>
								</div>
								<div className="col-sm-8">
									{request.selectedQuery &&
										<div className="form-group">
											<label className="control-label">
												{label}
											</label>
										</div>
									}
									<div className="form-group">
										<label className="control-label">Params</label>
										<StateParams />
									</div>
								</div>
							</div>
							<div className="row">
								<StateSubmit/>
							</div>
						</form>
					</div>
				</div>
				<StateResult />
			</Loadable>
        </section>
    </AppTemplate>;
};

export default App;
