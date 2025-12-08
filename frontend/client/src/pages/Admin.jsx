import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Admin(){
  const [clientes, setClientes] = useState([])
  const [platillos, setPlatillos] = useState([])
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: 0 })
  const [editId, setEditId] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(()=>{ loadAll() }, [])

  async function loadAll(){
    try {
      const [cRes, pRes] = await Promise.all([api.get('/api/clientes'), api.get('/api/platillos')])
      setClientes(cRes.data)
      setPlatillos(pRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleCreate(e){
    e.preventDefault()
    try {
      if(editId){
        await api.put(`/api/platillos/${editId}`, form)
        setMsg('Platillo actualizado')
        setEditId(null)
      } else {
        await api.post('/api/platillos', form)
        setMsg('Platillo creado')
      }
      setForm({ nombre:'', descripcion:'', precio:0 })
      loadAll()
    } catch (err) {
      setMsg('Error al guardar')
    }
  }

  function startEdit(p){
    setEditId(p._id)
    setForm({ nombre:p.nombre, descripcion:p.descripcion, precio:p.precio })
  }

  async function delPlatillo(id){
    if(!confirm('Eliminar platillo?')) return;
    await api.delete(`/api/platillos/${id}`)
    loadAll()
  }

  return (
    <section>
      <h2>Admin - Clientes y Platillos</h2>

      <div className="admin-grid">
        <div>
          <h3>Clientes / Reservas</h3>
          <ul>
            {clientes.map(c=>(
              <li key={c._id}><strong>{c.nombre}</strong> — {c.correo} — {c.notas}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Crear / Editar Platillo</h3>
          <form onSubmit={handleCreate} className="form">
            <input value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} placeholder="Nombre" required />
            <input value={form.descripcion} onChange={e=>setForm({...form, descripcion:e.target.value})} placeholder="Descripción" />
            <input type="number" value={form.precio} onChange={e=>setForm({...form, precio: Number(e.target.value)})} placeholder="Precio" required />
            <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
            {editId && <button type="button" onClick={()=>{ setEditId(null); setForm({nombre:'',descripcion:'',precio:0})}}>Cancelar</button>}
          </form>
          <p>{msg}</p>
        </div>

        <div>
          <h3>Listado de Platillos</h3>
          <ul>
            {platillos.map(p=>(
              <li key={p._id}>
                <strong>{p.nombre}</strong> — ${p.precio}
                <button onClick={()=>startEdit(p)}>Editar</button>
                <button onClick={()=>delPlatillo(p._id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
