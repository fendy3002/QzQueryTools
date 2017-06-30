var obj = function(state = [], action){
    switch (action.type) {
        case "SET_SELECTED_CONNECTION":
            return {
                ...state,
                selectedConnection: action.connection
            };
        case 'SET_SELECTED_COMMAND':
            return {
                ...state,
                selectedCommand: action.command
            };
        default:
            return state;
    };
};

module.exports = obj;
