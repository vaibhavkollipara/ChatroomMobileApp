import {baseUrl} from './baseurl';


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function register(data) {
    return (dispatch,getState) => {

        dispatch( {type : "TRY_SIGNUP",payload:{} } );
        fetch(baseUrl+'/accounts/signup/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
                if(response.status==201){
                    response.json().then((response) => {
                        sleep(1000 * 20).then(() => {
                            dispatch( {type:"SIGNUP_SUCCESSFUL",payload:{}} );
                        });
                    });
                }else{
                    response.json().then((response) => {
                        sleep(1000 * 20).then(() => {
                            dispatch( {type:"SIGNUP_FAILED",payload:response} );
                        });

                    });

                }
            })
            .catch((error) => {
                sleep(1000 * 20).then(() => {
                            dispatch( {type:"SIGNUP_FAILED",payload:error} );
                        });
            });
    }
}
