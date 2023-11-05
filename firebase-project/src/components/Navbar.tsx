import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { app_context_type, AppContext } from '../App'

declare type bypass = string | undefined;

const Navbar = () => {
  const { user } = useContext(AppContext) as app_context_type;

  return (
    <>
    <div className="navbar">
      { user && <Link to="/profile"><img className="pfp navbar-pfp" src={user?.photoURL as bypass} width="30" height="30" /></Link> }
      <Link className="nav-item" to="/">Home</Link>
      { user ?
        null : <Link className="nav-item" to="/login">Login</Link>
      } 

      { user && <p className="navbar-name">Welcome back, <Link to="/profile">{user.displayName}</Link></p> } 
    </div>    
    </>
  )
}

export default Navbar