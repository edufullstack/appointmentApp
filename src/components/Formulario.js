import React, { Fragment, useState } from 'react'
import { v4 as uuid } from 'uuid'

const Formulario = ({ crearCita }) => {
  //  crear State de citas
  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  })

  // creamos State de erorr
  const [error, setError] = useState(false)

  // Funcion que se ejecuta cuando el usuario escribe
  const handleChange = (event) => {
    setCita({ ...cita, [event.target.name]: event.target.value })
  }

  // extraer valores para facilitarnos la escritura ( opcional )
  const { mascota, propietario, fecha, hora, sintomas } = cita

  // cuando se preciona agregar cita
  const submitCita = (event) => {
    event.preventDefault()
    // Tenemos que validar formulario
    if (
      mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      setError(true)
      return
    }

    // eliminamos mensaje de error
    setError(false)

    // Asignamos un id
    cita.id = uuid()

    // Creamos la cita
    crearCita(cita)

    // Reiniciamos el form
    setCita({ mascota: '', propietario: '', fecha: '', hora: '', sintomas: '' })
  }

  return (
    <Fragment>
      <h2>Make Appointment</h2>
      {error ? <p className='alerta-error'>All fields are required </p> : null}
      <form onSubmit={submitCita}>
        <label>Pet Name</label>
        <input
          type='text'
          name='mascota'
          className='u-full-width'
          placeholder='Pet Name'
          onChange={handleChange}
          value={mascota}
        />
        <label>Owner Name</label>
        <input
          type='text'
          name='propietario'
          className='u-full-width'
          placeholder='Owner Name'
          onChange={handleChange}
          value={propietario}
        />
        <label>Date</label>
        <input
          type='date'
          name='fecha'
          className='u-full-width'
          onChange={handleChange}
          value={fecha}
        />
        <label>Hour</label>
        <input
          type='time'
          name='hora'
          className='u-full-width'
          onChange={handleChange}
          value={hora}
        />
        <label>Symptoms</label>
        <textarea
          className='u-full-width'
          name='sintomas'
          onChange={handleChange}
          value={sintomas}
        ></textarea>
        <button type='submit' className='u-full-width button-primary'>
          Add Appointment
        </button>
      </form>
    </Fragment>
  )
}

export default Formulario
