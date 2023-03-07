import React, { useEffect, useState } from 'react';
import "../styles/calender.css"
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useSelector } from 'react-redux';

const localizer = momentLocalizer(moment)
const defaultView = Views.WEEK;

const Employee = () => {
    const user = useSelector((state) => state.user.value);
    const [state, setState] = useState([]);
    
    useEffect(() => {
        const getShiftsbyId = async () => {
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/getShiftsById/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                for (let i = 0; i < json.length; i++) {
                    json[i].start = moment(json[i].start, "ddd DD MMM HH:mm").toDate(); // set start to 0
                    json[i].end = moment(json[i].end, "ddd DD MMM HH:mm").toDate(); // set end to 100
                }
                if (!response.ok) {
                    alert(json.message)
                }
                if (response.ok) {
                    setState(json)
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getShiftsbyId()
    }, [user.id, user.token])

    return (
        <div className="container">
            <div className='calendar' style={{marginTop: 70}}>
                <Calendar
                    localizer={localizer}
                    events={state}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    defaultView={defaultView}
                />
            </div>
        </div>

    )

}

export default Employee;