import {baseUrl} from './baseurl';

export function authenticate(data){
    return (dispatch,getState) => {
        dispatch({type : "TRY_LOGIN",payload : {} })

        // console.log("Fetching : "+ baseUrl+ "/auth/obtaintoken/");
        fetch(baseUrl+ "/auth/obtaintoken/",{
            method : 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }).then((response) => {
            if(response.status==200){
                response.json().then(response => {
                    dispatch({type:"TOKEN_OBTAINED",payload:response.token.toString()})
                    dispatch({type: "LOGIN_SUCCESSFUL",payload : response.token.toString() });
                }).catch(error => {console.log(error)});
            }else{
                response.json().then(response => {
                    console.log("Problem Signing In...")
                    dispatch({type: "LOGIN_FAILED",payload : response });
                }).catch(error => {console.log(error)});
            }
        }).catch((error) => {
            dispatch({type : "LOGIN_FAILED", payload: {error : ["Problem with network"]}})

        })
    }
}
