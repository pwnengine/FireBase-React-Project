import React, { Fragment } from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
//import { app_context_type, AppContext } from '../App'

const Login = () => {
  const nav = useNavigate();
  //const { auth_state } = useContext(AppContext) as app_context_type;

  const sign_in_with_google = async () => { // async because we work with a promise
    try {
      await signInWithPopup(auth, provider); // returns a promise
      nav('/');
    } catch(err) {
      console.log(`an err has occured: ${err}`);
    } 
  };

  return (
    <Fragment>
      <h2>Sign In To Google</h2>
      <button onClick={sign_in_with_google}>Sign In</button>
    </Fragment>
  )
}

export default Login