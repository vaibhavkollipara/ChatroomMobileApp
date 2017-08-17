const defaultState = {
    messages : [],
    error : null,
    members : [],
    userSuggestions : [],
    addMemberError : null
}


export default (state=defaultState,action) => {
        switch(action.type){
            case "MESSAGES_FETCHED" :
                return {...state, error : null, messages : action.payload};
            case "MESSAGES_FETCH_FAILED" :
                return {...state, error: action.payload };
            case "MEMBERS_FETCHED" :
                return {...state,error:null, members : action.payload};
            case "USER_SUGGESTIONS_FETCHED":
                return {...state,userSuggestions : action.payload}
            case "SET_ADD_MEMBER_ERROR":
                return {...state, addMemberError : action.payload}
            case "ADD_MEMBER_SUCCESS":
                return {...state, addMemberError : null,userSuggestions:[]}
            case "SET_ERROR" :
                return {...state, error:action.payload}
            default:
                return state;
        }
}
