import { useContext, useState, useEffect } from 'react'
import { db } from '../config/firebase'
import { app_context_type, AppContext } from '../App'
import { getDocs, addDoc, collection } from 'firebase/firestore'
import { useForm, FieldValues } from 'react-hook-form'

interface i_post_data {
  id: string;
  post: string;
  user: string;
}

const Home = () => {
  const holder: i_post_data[] = [];

  const { user } = useContext(AppContext) as app_context_type;

  const [ posts_state, set_posts_state ] = useState<i_post_data[] | null>(null);
  const [ made_post, set_made_post ] = useState('');

  const posts = collection(db, 'posts');
  const do_db = () => {
    const docs = getDocs(posts);
    docs.then((data) => {
      data.docs.forEach((val) => {
        holder.push({post: val.get('post'), user: val.get('user'), id: val.get('id')});
    });
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      set_posts_state(holder);
      console.log(posts_state);
    });
  };

  const handle_click = async (data: FieldValues) => {
    await addDoc(posts, {
      id: user?.uid,
      post: data?.post,
      user: user?.displayName,
    });

    set_made_post(data?.post);
  };

  const { register, handleSubmit } = useForm({});


  useEffect(() => {
    set_posts_state(null); //take this out so it doesn't visbly refresh
    do_db();
  }, [made_post]);

  return (
    <>
      <div className="channel-info-container">
        <div className="channel-info">
        {user?.photoURL && <img src={user?.photoURL || ''} style={{borderRadius: '50px'}} width="100" height="100" />}
        <h1>Noah's Channel</h1>
        </div>
      </div>

      

      <div className="post-block-container">
        {
          posts_state?.map((val) => {
            return( 
              <div className="post-block" key={Math.random()}>
                <h3 className="post-user">@{val.user}</h3>
                <p className="post-date">(11/04/23)</p>
                <button className="post-like-btn">🔥</button>
                <button className="post-dislike-btn">💩</button>
                <p key={Math.random()} className="post-text">{val.post}</p>
                
              </div>
           );
          })
        }
      </div>

      <div className="schedule-container">
        <h2>
          Schedule
        </h2>

        <div className="scheduled-events">
        <button className="event">Add</button>
        <button className="event">Dummy Event 1</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        <button className="event">Dummy Event 2</button>
        </div>
      </div>

      <div className="post-form-container">
        <form onSubmit={handleSubmit(handle_click)}>
          <input className="post-form-input" type="text" placeholder="What's on your mind?" {...register('post')} />
          <button className="post-form-submit" type="submit">post</button>  
        </form>

        
      </div>
    </>
  )
}

export default Home