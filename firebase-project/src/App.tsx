import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthStateHook, useAuthState, User } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase'

import './assets/css/App.css'

import Home from './pages/Home'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Profile from './pages/Profile'

export type app_context_type = {
  user: User | null | undefined;
};

export const AppContext = createContext<app_context_type | null>(null);

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <AppContext.Provider value={{user}}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
