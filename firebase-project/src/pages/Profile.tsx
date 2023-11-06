import { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { app_context_type, AppContext } from '../App'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user } = useContext(AppContext) as app_context_type;
  const nav = useNavigate();

  const sign_out = async () => {
    await signOut(auth);
    nav('/');
  };

  if(!user) {
    return(
      <h1>Must Be Signed In!</h1>
    );
  }

  return (
    <>
      <div>
        { user &&
          <button onClick={sign_out}>Sign Out</button>
        }
      </div>
    </>
  )
}

export default Profile