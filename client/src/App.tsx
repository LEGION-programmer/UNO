import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import GamePage from './pages/GamePage'
import NotFound from './pages/NotFound'

function App() {
  document.body.style.backgroundColor = '#FF3C00'
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game/:roomId" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
