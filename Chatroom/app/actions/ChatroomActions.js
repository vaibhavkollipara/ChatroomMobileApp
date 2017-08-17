import {baseUrl} from './baseurl';

export function loadMessages(token,chatroomSlug){

    return (dispatch,getState) => {
        fetch(`${baseUrl}/chatroom/${chatroomSlug}`,{
            method:'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
              }
        }).then((response) => {
            if(response.status==200){
                response.json().then((response) => {
                    dispatch({type :"MESSAGES_FETCHED", payload:response.results})
                });
            }else{
                response.json().then((response) => {
                    dispatch({type : "SET_ERROR", payload : response})
                });
            }
        }).catch((error) => {
            dispatch( {type: "SET_ERROR", payload : {error : "Problem with network"}})
        })
    }
}

export function fetchMembers(token,chatroomSlug){
        return (dispatch,getState) => {
            fetch(`${baseUrl}/chatroom/${chatroomSlug}/memberslist/`,{
                    method : 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`
                      }
                }).then((response) =>{
                    if(response.status==200){
                        response.json().then((response) => {
                            dispatch({type: "MEMBERS_FETCHED",payload:response});
                        });
                    }else{
                        response.json().then((response) => {
                            dispatch({type: "SET_ERROR",payload:response});
                        });
                    }

                }).catch((error) =>{
                    dispatch({type: "SET_ERROR",payload:{error : "Problem with network"}});
                });
        }
    }

export function sendMessage(token,chatroomSlug,message){
    return (dispatch,getState) =>{
        fetch(`${baseUrl}/chatroom/${chatroomSlug}/newmessage/`,{
                method:'post',
                body : JSON.stringify({
                    message
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            }).then((response) => {
                if(response.status!==201){
                    response.json().then((response) => {
                        dispatch({type:"MESSAGE_SEND_FAILED",payload:response })
                    })
                }
            }).catch((response) => {
                dispatch({type:"MESSAGE_SEND_FAILED",payload: {error: "Problem with network"}})
            });
    }
}

export function exitChatroom(token,chatroomSlug){
    return (dispatch,getState) => {
        fetch(`${baseUrl}/chatroom/${chatroomSlug}/exit/`,{
                method:'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            }).then((response) => {
                if(response.status!==204){
                    response.json().then((response) => {
                        dispatch({type:"SET_ERROR",payload:response })
                    })
                }
            }).catch((response) => {
                dispatch({type:"SET_ERROR",payload: {error: "Problem with network"}})
            });
    }
}

export function addMember(token,chatroomSlug,username){
    return (dispatch,getState) => {
        fetch(`${baseUrl}/chatroom/${chatroomSlug}/newmember/`,{
                method:'post',
                body : JSON.stringify({
                    username
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            }).then((response) => {
                if(response.status!=201){
                    response.json().then((response) => {
                        dispatch({type:"SET_ADD_MEMBER_ERROR",payload:response })
                    })
                }else{
                    dispatch({type:"ADD_MEMBER_SUCCESS",payload:{}});
                }
            }).catch((response) => {
                dispatch({type:"SET_ADD_MEMBER_ERROR",payload: {error: "Problem with network"}})
            });
    }
}

export function getUserSuggestions(token,searchString){
    return (dispatch,getState) => {
        http://127.0.0.1:8000/accounts/users/?search='+searchstring
        fetch(`${baseUrl}/accounts/users/?search=${searchString}`,{
                method:'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            }).then((response) => {
                if(response.status==200){
                    response.json().then((response) => {
                        dispatch({type:"USER_SUGGESTIONS_FETCHED",payload:response.results })
                    })
                }
            }).catch((response) => {
                dispatch({type:"SET_ERROR",payload: {error: "Problem with network"}})
            });
    }
}
