import { useContext, useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { app_context_type, AppContext } from '../App'
import { getDocs, addDoc, collection } from 'firebase/firestore'
import { useForm, FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRandom } from '../hooks/useRandom'

interface props {
  photo_url: string;
  channel_name: string;
  channel_id: string;
}

interface i_post_data {
  uid: string;
  pid: string;
  post: string;
  user: string;
  likes: number;
  dislikes: number;
}

const Channel = ({ photo_url, channel_name, channel_id }: props) => {
  const { user } = useContext(AppContext) as app_context_type;

  const [ posts_state, set_posts_state ] = useState<i_post_data[] | null>(null);
  const [ made_post, set_made_post ] = useState('');
  //const [ total_likes, set_total_likes ] = useState(0);
  const [ made_like, set_made_like ] = useState('');
  const [ made_dislike, set_made_dislike ] = useState('');
  
  const random_post_id = useRandom();

  const nav = useNavigate();

  const handle_click = async (data: FieldValues) => {
    if(!user) {
      nav('/login');
    } else {
      const posts = collection(db, `${channel_id}_posts`);
      await addDoc(posts, {
        uid: user?.uid,
        pid: `${user?.uid}${random_post_id}`,
        post: data?.post,
        user: user?.displayName,
      });

      set_made_post(data?.post);
    }
  };

  const handle_like = (pid: string) => {
    const likes = collection(db, `${channel_id}_likes`);
    addDoc(likes, {
      user_id: user?.uid,
      post_id: pid,
    });

    set_made_like(pid);
  };

  const handle_dislike = (pid: string) => {
    const dislikes = collection(db, `${channel_id}_dislikes`);
    addDoc(dislikes, {
      user_id: user?.uid,
      post_id: pid,
    });

    set_made_dislike(pid);
  };

  const { register, handleSubmit } = useForm({});

  interface i_cnt {
    likes: number;
    dislikes: number;
  }

  useEffect(() => {
    const likes = collection(db, `${channel_id}_likes`);
    const dislikes = collection(db, `${channel_id}_dislikes`);
    const get_reaction_cnt = async (tmp_pid: string): Promise<i_cnt> => {
      const cnt = {
        likes: 0,
        dislikes: 0,
      };
  
      const likes_docs = await getDocs(likes);
      likes_docs.docs.forEach((value) => {
        if(value.get('post_id') === tmp_pid) {
          cnt.likes++;
        }
      });

      const dislikes_docs = await getDocs(dislikes);
      dislikes_docs.docs.forEach((value) => {
        if(value.get('post_id') === tmp_pid) {
          cnt.dislikes++;
        }
      });
  
      return cnt
    };

    const posts = collection(db, `${channel_id}_posts`);
    console.log('IS READING!');
    const docs = getDocs(posts);

    const holder: i_post_data[] = [];
    docs.then((data) => {
      data.docs.forEach((val) => {
        const tmp_pid = val.get('pid');
        get_reaction_cnt(tmp_pid).then((cnt) => {
          holder.push({post: val.get('post'), user: val.get('user'), uid: val.get('uid'), pid: val.get('pid'), likes: cnt.likes, dislikes: cnt.dislikes});
          set_posts_state(holder);
        });
      });
    }).catch((err) => {
      console.log(err);
    })
  }, [made_post, made_like, made_dislike, channel_id]);

  return (
    <>
      <div className="channel-info-container">
        <div className="channel-info">
        {photo_url && <img src={photo_url || ''} style={{borderRadius: '50px'}} width="100" height="100" />}
        <h1>{channel_name}</h1>
        </div>
      </div>

      <div className="post-block-container">
        {
          posts_state?.map((val) => {
            return( 
              <div className="post-block" key={Math.random()}>
                <h3 className="post-user">@{val.user}</h3>
                <p className="post-date">(11/04/23)</p>
                <button onClick={() => handle_like(val.pid)} className="post-like-btn">🔥{val.likes}</button>
                <button onClick={() => handle_dislike(val.pid)} className="post-dislike-btn">💩{val.dislikes}</button>
                <p key={Math.random()} className="post-text">{val.post}</p>
                
              </div>
           );
          })
        }
      </div>

      <div className="post-form-container">
        <form onSubmit={handleSubmit(handle_click)}>
          <input className="post-form-input" type="text" placeholder="What's on your mind?" {...register('post')} onKeyDown={(e) => {
            if(e.key === 'Enter') 
              e.currentTarget.value = '';
          }} />
          <button className="post-form-submit" type="submit">post</button>  
        </form>
      </div>
    </>
  )
}

export default Channel