import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Registration from './authUI/Registration'
import Home from './Home/Home'
import Login from './authUI/Login'
import MoviePage from './moviePage/MoviePage'
import WatchListPage from './moviePage/WatchListPage'
import './index.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/:title" element={<MoviePage/>}/>
      <Route path="/watchlist" element={<WatchListPage/>}/>
      <Route path="*" element={<Navigate to="/"></Navigate>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
