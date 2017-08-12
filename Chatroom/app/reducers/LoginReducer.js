const defaultState = {
    authenticated : false,
    token : null,
    error : null
}

export default (state=defaultState,action) => {
    switch(action.type){
        default :
            return state
    }
}
