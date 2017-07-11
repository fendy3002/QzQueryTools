import controllers from '../controllers';
import home from '../controllers/home.js';
import watch from '../controllers/watch.js';

var webRoute = function(app){
	app.get('/', home.get);
	app.post('/watch/:connection/:query', watch.post);

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