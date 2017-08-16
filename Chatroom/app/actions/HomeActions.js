import {baseUrl} from './baseurl';


export function fetchUserDetails(token){
    return (dispatch,getState) => {
        dispatch( {type:"FETCH_USER_DETAILS",payload:{}} );
        fetch(baseUrl+ "/accounts/mydetails/",{
            method : 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
              }
        }).then(response => {
            if(response.status==200){
                response.json().then((response) => {
                    dispatch( {type:"FETCH_USER_DETAILS_SUCCESS" , payload : response});
                });
            }else{
                response.json().then((response) => {
                    // console.log(response);
                    dispatch( {type:"FETCH_USER_DETAILS_FAILED" , payload : response});
                });
            }
        }).catch(response => {
            dispatch( {type:"FETCH_USER_DETAILS_FAILED" , payload : {error :["Please check your network connection\nor\nTry Again Later"]}});
        });
    }
}

export function refreshChatroomsList(token){
    // console.log(`Refresh rooms..........${token}`);
    return (dispatch,getState) =>{
        fetch(baseUrl+ "/mychatrooms/",{
            method : 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
              }
        }).then(response => {
            if(response.status==200){
                response.json().then(response => {
                    dispatch( {type:"CHATROOMS_REFRESHED",payload:response} );
                });
            }else{
                response.json().then(response =>{
                    dispatch( {type:"CHATROOMS_REFRESH_FAILED",payload: response } );
                })
            }

        }).catch(error => {
            dispatch({type:"CHATROOMS_REFRESH_FAILED",payload: {error : ["Problem Fetching Chatrooms..."]} } );
        });
    }
}

export function createChatroom(token,chatroomName){
    return (dispatch,getState) => {
        fetch(`${baseUrl}/newchatroom/`,{
                method : 'post',
                body : JSON.stringify({ name : chatroomName }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                  }
            }).then((response) =>{
                if(response.status!==201){

                    response.json().then((response) => {
                        console.log(response);
                        dispatch({type:"SET_ERROR",payload:response})
                    });
                }

            }).catch((error) =>{
                dispatch({type:"SET_ERROR",payload:{error: "Problem with network"}})
            });
    }
}


export function setToken(token){
    return (dispatch,getState) => {
        dispatch({type:"TOKEN_OBTAINED",payload:token})
    }
}


export function logout(){
    return (dispatch,getState) => {
        dispatch({type: "LOGOUT",payload:{}});
    }
}
