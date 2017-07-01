import config from '../controllers/api/config.js';
import controllers from '../controllers/api';

var apiRoute = function(app, prefix){
	app.get(prefix + '/config/connection', config.getConnection);
	app.get(prefix + '/config/query', config.getQuery);

	var controllerKeys = Object.keys(controllers);
	controllerKeys.map(k=> {
		var selected = controllers[k];
		if(selected.get){
			app.get(prefix + '/' + k, selected.get);
		}
		if(selected.post){
			app.post(prefix + '/' + k, selected.post);
		}
	});
};
export default apiRoute;