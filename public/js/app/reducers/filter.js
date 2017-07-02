var obj = function(state = [], action){
    switch (action.type) {
        case "SET_SELECTED_CONNECTION":
            return {
                ...state,
                selectedConnection: (action.connection || {}).name,
                selectedQuery: null
            };
        case 'SET_SELECTED_QUERY':
            return {
                ...state,
                selectedQuery: (action.query || {}).filePath
            };
        default:
            return state;
    };
};

module.exports = obj;
