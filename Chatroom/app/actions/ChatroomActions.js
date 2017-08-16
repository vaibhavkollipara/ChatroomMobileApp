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
