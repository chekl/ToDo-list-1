import React from 'react';
import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route exact path='/' component={About}/>

        <Route path='/posts' components={Posts}/>        
      </Routes>
       
      </BrowserRouter>
  )
}

export default App;