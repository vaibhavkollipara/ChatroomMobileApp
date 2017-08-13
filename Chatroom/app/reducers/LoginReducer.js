const defaultState = {
    token : false,
    error : null,
    loading : false
}

export default (state=defaultState,action) => {
    switch(action.type){
        case "TRY_LOGIN":
            return {...state,error : null, loading:true}
        case "LOGIN_SUCCESSFUL":
            return {...state, error : null, loading: false, token : action.payload}
        case "LOGIN_FAILED":
            return {...state,loading: false, error : action.payload}
        default :
            return state
    }
}
