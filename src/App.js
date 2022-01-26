import React, {useEffect, useState} from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modalWindow/MyModal';
import PostService from './API/PostService';
import { usePosts } from "./hooks/usePosts"
import { useFetching } from './hooks/useFetching';
import './styles/App.css'
import { getPageCount, getPagesArray } from './utils/pages';
import Loader from './components/UI/loader/Loader';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect( () => {
    fetchPosts();
  }, [])

  const createPost = ((newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  })

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}> Get posts</button>
      <MyButton style={{marginTop: 30}}onClick={ () => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {postError &&
        <h1 style={{textAlign: 'center', marginTop: 30}}>OOOPS Error ${postError}</h1>}
      {isPostsLoading
        ? <div style={{display:'flex', marginTop:20, justifyContent:'center'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchPosts} title='List of posts 1'/>
      }

      <div className='page-wrapper'>
        {pagesArray.map( p => 
          <span 
            key={p} 
            className={page === p ? 'page page-current' : 'page' }
            onClick={() => setPage(p)}>{p}</span>
        )}        
      </div>

    </div>
  );
}

export default App;