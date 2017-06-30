var config = function(state = [], action){
    switch (action.type) {
    	case 'SET_CONFIG':
    		return action.config;
        default:
            return state;
    };
};

module.exports = config;
