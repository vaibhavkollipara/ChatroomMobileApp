const defaultState = {
    messages : [],
    error : null,
    members : []
}


export default (state=defaultState,action) => {
        switch(action.type){
            case "MESSAGES_FETCHED" :
                return {...state, error : null, messages : action.payload};
            case "MESSAGES_FETCH_FAILED" :
                return {...state, error: action.payload };
            case "MEMBERS_FETCHED" :
                return {...state,error:null, members : action.payload};
            case "SET_ERROR" :
                return {...state, error:action.payload}
            default:
                return state;
        }
}
