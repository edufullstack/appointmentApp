import React, { Fragment, useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'
import PropTypes from 'prop-types'

function App() {
  // citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) {
    citasIniciales = []
  }

  // array de citas
  const [citas, setCitas] = useState(citasIniciales)

  // useEfecct para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas])

  // funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    setCitas([...citas, cita])
  }

  // funcion que elimina una cita por su id

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((citas) => citas.id !== id)
    setCitas(nuevasCitas)
  }

  // mensaje cuando no hay citas
  const titulo =
    citas.length === 0 ? 'No appointmens' : 'Manage your appointments'

  return (
    <Fragment>
      <h1>Patient Manager</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario crearCita={crearCita} />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map((cita) => {
              return (
                <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
}

export default App
