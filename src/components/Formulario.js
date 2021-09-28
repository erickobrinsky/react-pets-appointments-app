import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4'
import PropTypes from 'prop-types';

const Formulario = ({createAppointment}) => {

const [appointment, updateAppointment ] = useState({
    pet: '',
    owner: '',
    date: '',
    time: '',
    symptoms: ''
})

const updateState = e => {
    updateAppointment({
        ...appointment,
        [e.target.name]: e.target.value
    })

}

const [error, updateError] = useState(false)

const {pet, owner, date, time, symptoms} = appointment;

const submitAppointment = e => {
    e.preventDefault()
    if(pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === ''){
        console.log('there is an error');
        updateError(true)
        return 
    }
    updateError(false)
    appointment.id = uuid()

    createAppointment(appointment)

    updateAppointment({
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptoms: ''
    })


}

return (
    <Fragment>
        <h2>Create appointment</h2>
        {error?<p className="alert-error">Every fields are mandatory</p>: null}

        <form
onSubmit={submitAppointment}
        >
            <label>Pet name</label>
            <input 
            type="text" 
            name="pet"
            className="u-full-width"
            placeholder="Pet name"
            onChange={updateState}
            value={pet}
            />
                 <label>Owner name</label>
            <input 
            type="text" 
            name="owner"
            className="u-full-width"
            placeholder="Pet owner name"
            onChange={updateState}
            value={owner}
            />
                 <label>Date</label>
            <input 
            type="date" 
            name="date"
            className="u-full-width"
            onChange={updateState}
            value={date}
            />
                 <label>Time</label>
            <input 
            type="time" 
            name="time"
            className="u-full-width"
            onChange={updateState}
            value={time}
            />
                 <label>Symptoms</label>
            <textarea 
            className="u-full-width"
            name="symptoms"
            onChange={updateState}
            value={symptoms}
            ></textarea>
            <button
          type="submit"
          className="u-full-width button-primary"
            >Add appointment</button>
        </form> 
    </Fragment>

)
Formulario.propTypes = {
    createAppointment: PropTypes.func.isRequired
}
}

export default Formulario