// app placeholder
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservas from './pages/Reservas'
import Admin from './pages/Admin'

function App(){
  return (
    <div className="app">
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="footer">Restaurante Delicia - MERN</footer>
    </div>
  )
}

export default App
