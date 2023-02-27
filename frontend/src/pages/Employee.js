import React, { useEffect, useState } from 'react';
import "../styles/calender.css"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);

// const events = {
//     events: [
//         {
//             start: moment().toDate(),
//             end: moment()
//                 .add(1, "days")
//                 .toDate(),
//             title: "Some title"
//         },
//         {
//             start: moment().toDate(),
//             end: moment()
//                 .add(1, "days")
//                 .toDate(),
//             title: "Some title"
//         },
//         {
//             start: moment().toDate(),
//             end: moment()
//                 .add(1, "days")
//                 .toDate(),
//             title: "Some title"
//         },
//     ]
// }

const Employee = () => {
    const [state, setState] = useState([]);
    
    useEffect(() => {
        const getShiftsbyId = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/getShiftsById/6cf48152-d81c-419b-a1b9-8057a5484614`, {
                    method: 'GET',
                })
                const json = await response.json()
                for (let i = 0; i < json.length; i++) {
                    json[i].start = moment(json[i].start, "ddd DD MMM HH:mm").toDate(); // set start to 0
                    json[i].end = moment(json[i].end, "ddd DD MMM HH:mm").toDate(); // set end to 100
                }
                console.log(json);
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
    }, [])

    const onEventResize = (data) => {
        const { start, end } = data;

        setState((state) => {
            state[0].start = start;
            state[0].end = end;
            return [...state]
        });
    };

    const onEventDrop = (data) => {
        console.log(data);
    };

    return (
        <div className="container">
            <div className='calendar'>
                {/* <Calendar
                    localizer={localizer}
                    events={state}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                /> */}
                <DnDCalendar
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={state}
                    localizer={localizer}
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    onDoubleClickEvent={() => console.log("Hello")}
                    resizable
                    style={{ height: "100vh" }}
                />
            </div>
        </div>

    )

}

export default Employee;