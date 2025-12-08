import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(){
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="brand"><Link to="/">Delicia</Link></div>
        <div className="links">
          <Link to="/menu">Menú</Link>
          <Link to="/reservas">Reservas</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  )
}
