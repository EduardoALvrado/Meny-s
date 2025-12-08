import React, { useState } from 'react'
import { api } from '../api'

export default function Reservas(){
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const body = { nombre, correo, telefono, notas: `Reserva para ${fecha}` }
      await api.post('/api/clientes', body)
      setMensaje('Reserva creada correctamente')
      setNombre(''); setCorreo(''); setTelefono(''); setFecha('')
    } catch (err) {
      setMensaje('Error al crear la reserva')
    }
  }

  return (
    <section>
      <h2>Reservas</h2>
      <form onSubmit={handleSubmit} className="form">
        <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" required />
        <input value={correo} onChange={e=>setCorreo(e.target.value)} placeholder="Correo" required />
        <input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono" />
        <input type="datetime-local" value={fecha} onChange={e=>setFecha(e.target.value)} required />
        <button type="submit">Reservar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}
