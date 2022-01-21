import React, {useState} from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
    {id: 1,  title: 'a', body: 'c'},
    {id: 2,  title: 'b', body: 'b'},
    {id: 3,  title: 'c', body: 'a'}
  ])
  const [selectedSort, setSelectedSort] = useState('')

  const createPost = ((newPost) => {
    setPosts([...posts, newPost]);
  })

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <MySelect 
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='For'
        options={[
          {value: 'title', name: 'title'},
          {value: 'body', name: 'description'}
        ]}
      />
      {posts.length !==0
        ? 
        <PostList remove={removePost} posts={posts} title='List of posts 1'/>
        : 
        <h1 style={{textAlign: 'center'}}>
          OOOPS Empty block
        </h1>
      }
      
    </div>
  );
}

export default App;
