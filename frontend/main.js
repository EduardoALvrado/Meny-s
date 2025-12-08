fetch("http://localhost:5000/mensaje")
  .then(res => res.json())
  .then(data => {
    document.getElementById("respuesta").innerText = data.mensaje;
  })
  .catch(err => console.error(err));

