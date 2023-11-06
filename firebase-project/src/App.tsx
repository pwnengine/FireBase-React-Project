import { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDocs, collection } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { auth, db } from './config/firebase'

import './assets/css/App.css'

import Home from './pages/Home'
import Login from './pages/Login'

import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Channel from './components/Channel'

export type app_context_type = {
  user: User | null | undefined;
};

export interface i_channel_data {
  channel_id: string;
  channel_img: string;
  channel_name: string;
}

export const AppContext = createContext<app_context_type | null>(null);

const App = () => {
  const [ channel_list, set_channel_list ] = useState<i_channel_data[]>([]);

  useEffect(() => {
    const channels_ref = collection(db, 'channels');

    const get_channels = async () => {
      const holder: i_channel_data[] = [];

      const channels = await getDocs(channels_ref);
      channels.docs.forEach((value) => {
        const tmp_obj = {
          channel_id: value.get('channel_id'),
          channel_img: value.get('channel_img'),
          channel_name: value.get('channel_name'),
        };
        holder.push(tmp_obj)
      });

      set_channel_list(holder);
    };
    
    get_channels();
  }, [])

  const [user] = useAuthState(auth);
  return (
    <AppContext.Provider value={{user}}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home channel_list={channel_list} set_channel_list={set_channel_list} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          {
            channel_list.map((val) => {
              return (
                <Route key={val.channel_id} path={val.channel_id} element={<Channel channel_name={val.channel_name} photo_url={val.channel_img} channel_id={val.channel_id} />} />
              );
            })
          }

        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
