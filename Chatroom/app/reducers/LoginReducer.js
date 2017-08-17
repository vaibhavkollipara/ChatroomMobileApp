const defaultState = {
    token : null,
    error : null,
    loading : false
}

export default (state=defaultState,action) => {
    switch(action.type){
        case "TRY_LOGIN":
            return {...state,error : null,token:null, loading:true}
        case "LOGIN_SUCCESSFUL":
            return {...state, error : null, loading: false, token : action.payload}
        case "LOGIN_FAILED":
            return {...state, loading:false, token:null, error : action.payload,token:null}
        default :
            return state
    }
}
