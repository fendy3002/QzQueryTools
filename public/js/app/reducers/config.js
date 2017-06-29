var config = function(state = [], action){
    switch (action.type) {
    	case 'SET_CONFIG_URL':
    		return {
    			...state,
    			'configUrl': action.url
			};
        default:
            return state;
    };
};

module.exports = config;
