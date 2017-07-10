var obj = function(state = [], action){
    switch (action.type) {
        case "SET_SELECTED_CONNECTION":
            return {
                ...state,
                selectedConnection: action.connection,
                selectedQuery: null,
                params: null
            };
        case "SET_SELECTED_QUERY":
            return {
                ...state,
                selectedQuery: action.query,
                params: null
            };
        case "SET_EXEC_RESULT":
            return {
                ...state,
                execResult: action.result
            };
        case "APPEND_PARAMS":
            return {
                ...state,
                params: {
                    ...state.params,
                    ...action.param
                }
            }
        case "SET_README":
            return {
                ...state,
                readme: action.readme
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    };
};

module.exports = obj;
