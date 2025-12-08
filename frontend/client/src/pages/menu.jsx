import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Menu(){
  const [platillos, setPlatillos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load(){
      try {
        const res = await api.get('/api/platillos')
        setPlatillos(res.data)
      } catch (err) {
        setError('No se pudo cargar el menú')
      } finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <section>
      <h2>Menú</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div className="grid">
        {platillos.map(p => (
          <article key={p._id} className="card">
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><strong>${p.precio}</strong></p>
            <p>{p.disponible ? 'Disponible' : 'Agotado'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
