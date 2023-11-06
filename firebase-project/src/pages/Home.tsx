import { useState } from 'react'
import styles from '../assets/css/Home.module.css'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useContext } from 'react'
import { AppContext, app_context_type, i_channel_data } from '../App'
import { useRandom } from '../hooks/useRandom'
import { useNavigate } from 'react-router-dom'

interface props {
  channel_list: i_channel_data[];
  set_channel_list: (val: i_channel_data[]) => void;
}

const Home = ({ channel_list, set_channel_list }: props) => {
  const random_id = useRandom();

  const { user } = useContext(AppContext) as app_context_type;

  const [ channel_name, set_channel_name ] = useState<string>('');
  
  const [ editing_check, set_editing_check ] = useState<boolean>(false);

  const nav = useNavigate();

  const handle_create_click = (back: boolean = false) => {
    const channels_ref = collection(db, 'channels');

    if(back) {
      set_editing_check(false);
      return
    }
    if(channel_name != '' && channel_name != '  ') {
      
      addDoc(channels_ref, {
        channel_name,
        channel_id: `${user?.uid}${random_id}`,
        channel_img: user?.photoURL,
      });

      set_channel_list([...channel_list, {channel_id: `${user?.uid}${random_id}`, channel_img: String(user?.photoURL), channel_name }]);
      
      nav(`${user?.uid}${random_id}`);
    }
  };
  
  return (
    <div className={styles['channels-container']}>
      <h2 style={{ display: 'inline-block' }}>{ editing_check === false ? 'Channels' : 'Create Channel' }</h2>

      { editing_check === false &&
        <div>
          <button onClick={() => set_editing_check(true)} className={styles['add-channel-btn']}>🚀</button>

          {
            channel_list.map((value, index) => {
              return ( // then setup onClick and use useNavigate to change to the channel
                <button onClick={() => nav(value.channel_id)} key={index} className={styles['channels']}>{value.channel_name}</button>
              );
            })
          }
        </div>
      }

      { editing_check === false ||
        <div>
          <input onChange={(e) => set_channel_name(e.target.value)} onClick={(e) => e.currentTarget.value = ' '} className={styles['create-channel-input']} placeholder="Channel Name"/>
          <button onClick={() => handle_create_click()} className={styles['create-channel-btn']}>Create</button>
          
          <button onClick={() => handle_create_click(true)} className={styles['create-channel-btn']}>← Back</button>
        </div>
      }
    </div>
  )
}

export default Home