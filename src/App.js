import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Appointment from './components/Appointment';

function App() {

  // Citas en local storage
  let appointmentsBegineers = JSON.parse(localStorage.getItem('appointment'));
  if(!appointmentsBegineers) {
    appointmentsBegineers = [];
  }

  // Arreglo de citas
  const [appointments, saveAppointments] = useState(appointmentsBegineers);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
      let appointmentsBegineers = JSON.parse(localStorage.getItem('appointments'));

      if(appointmentsBegineers) {
        localStorage.setItem('appointments', JSON.stringify(appointments))
      } else {
        localStorage.setItem('appointments', JSON.stringify([]));
      }
  }, [appointments] );

  // Función que tome las citas actuales y agregue la nueva
  const createAppointment = appointment => {
    saveAppointments([ ...appointments, appointment ]);
  }

  // Función que elimina una cita por su id
  const deleteAppointment = id => {
     const newAppointments = appointments.filter(appointment => appointment.id !== id );
     saveAppointments(newAppointments);
  }

  // Mensaje condicional
  const title = appointments.length === 0 ? 'There isnt appointments' : 'Manage your Appointments';

  return (
    <Fragment>
      <h1>Manage your Appointments</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario 
                createAppointment={createAppointment}
              />
          </div>
          <div className="one-half column">
              <h2>{title}</h2>
              {appointments.map(appointment => (
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                  deleteAppointment={deleteAppointment}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;