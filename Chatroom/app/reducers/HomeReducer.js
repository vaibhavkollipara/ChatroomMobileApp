const defaultState = {
    token : null,
    user : null,
    chatrooms : [],
    error : null,
    loading:false
}

export default (state=defaultState,action) => {
    switch(action.type){
        case "TOKEN_OBTAINED":
            return {...state,error:null,token:action.payload}
        case "FETCH_USER_DETAILS":
            return {...state, error:null, loading:true};
        case "FETCH_USER_DETAILS_FAILED":
            return {...state, loading:false, error: action.payload};
        case "FETCH_USER_DETAILS_SUCCESS":
            return {...state,loading:false, error: null, user : action.payload};
        case "CHATROOMS_REFRESHED":
            return {...state, error:null, chatrooms : action.payload};
        case "CHATROOMS_REFRESH_FAILED":
            return {...state,error:action.payload}
        case "LOGOUT":
            return {...state,error:null,chatrooms:[],token:null,user:null};
        case "SET_ERROR":
            return {...state,error : action.payload};
        default:
            return state;
    }
}
