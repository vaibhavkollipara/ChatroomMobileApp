const defaultState = {
    status : false,
    error : null,
    loading: false
}

export default (state=defaultState,action) => {
    switch(action.type){
        case 'TRY_SIGNUP':
            return {...state, loading:true,error :null};
        case 'SIGNUP_SUCCESSFUL':
            return {...state, loading:false, error: null, status: true,};
        case 'SIGNUP_FAILED':
            return {...state, loading:false, status:false, error : action.payload};

        case 'ADD_NOTE':
            return {...state, loading:false, status:false, error : {msg :"Note Added"}};

        default:
            return state;
    }
}
