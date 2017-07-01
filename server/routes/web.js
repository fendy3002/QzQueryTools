import controllers from '../controllers';
import home from '../controllers/home.js';

var webRoute = function(app){
	app.get('/', home.get);

	var controllerKeys = Object.keys(controllers);
	controllerKeys.map(k=> {
		var selected = controllers[k];
		if(selected.get){
			app.get('/' + k, selected.get);
		}
		if(selected.post){
			app.post('/' + k, selected.post);
		}
	});
};
export default webRoute;