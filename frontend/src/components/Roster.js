import React from 'react';
import '../styles/roster.css'
import { Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Shift from './Shift';

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let date = new Date();
let day = date.getUTCDay();
let monday = new Date(date.getTime() - (day - 1) * 86400000);

let dates = [];
for (let i = 0; i < 7; i++) {
    let currentDate = new Date(monday.getTime() + i * 86400000);
    let dayName = days[currentDate.getUTCDay()];
    let month = currentDate.toLocaleString('default', { month: 'short' });
    let day = currentDate.getUTCDate();
    dates.push(`${dayName} ${day} ${month}`);
    // console.log(`${dayName} ${day} ${month}`);
}

const employees = [
    {
        id: 1,
        name: "Naphtali",
        job: "Chef",
        shifts: [
            {
                description: "Kitchen", //optional
                day: "Mon",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Canteen", //optional
                day: "Wed",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Student Center", //optional
                day: "Fri",
                startTime: "09:00",
                endTime: "17:00"
            },
        ]
    },
    {
        id: 2,
        name: "Aideen",
        job: "Chef",
        shifts: [
            {
                description: "Kitchen", //optional
                day: "Mon",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Canteen", //optional
                day: "Thu",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Student Center", //optional
                day: "Fri",
                startTime: "09:00",
                endTime: "17:00"
            },
        ]
    },
    {
        id: 3,
        name: "Timothy",
        job: "Chef",
        shifts: [
            {
                description: "Kitchen", //optional
                day: "Mon",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Canteen", //optional
                day: "Thu",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Student Center", //optional
                day: "Sun",
                startTime: "09:00",
                endTime: "17:00"
            },
        ]
    },
    {
        id: 4,
        name: "Mark",
        job: "Chef",
        shifts: [
            {
                description: "Kitchen", //optional
                day: "Mon",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Canteen", //optional
                day: "Wed",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Student Center", //optional
                day: "Sat",
                startTime: "09:00",
                endTime: "17:00"
            },
        ]
    },
    {
        id: 5,
        name: "Robbie",
        job: "Chef",
        shifts: [
            {
                description: "Kitchen", //optional
                day: "Mon",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Canteen", //optional
                day: "Wed",
                startTime: "09:00",
                endTime: "17:00"
            },
            {
                description: "Student Center", //optional
                day: "Fri",
                startTime: "09:00",
                endTime: "17:00"
            },
        ]
    },
]



const Roster = () => {
    return (
        <div className="container">
            <div className='roster-buttons'>
                <Button color="error" variant="contained" startIcon={<DeleteIcon />}>Delete Roster</Button>
            </div>
            <table className='table'>
                {/* tale-dark is an option */}
                <thead>
                    <tr>
                        <th scope='col'></th>
                        {dates.map((date, i) => (
                            <th scope='col' key={i}>
                                <p style={{ textAlign: 'center' }}>{date}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, i) => (
                        <tr key={i}>
                            <td>
                                <div className='names' style={{ marginRight: 'auto' }}>
                                    <Avatar sx={{ bgcolor: "#000000" }}>
                                        {employee.name.charAt(0).toUpperCase()}</Avatar>
                                    <div className="details">
                                        <p>{employee.name}</p>
                                        <p className='job'>{employee.job}</p>
                                    </div>
                                </div>
                            </td>
                            {/* {employee.shifts.map((shift) => (
                                <td></td>
                            ))} */}
                            {dates.map((date, i) => {
                                let shift = employee.shifts.filter(shift => shift.day === date.split(' ')[0])[0];
                                return (
                                    <td key={i}>
                                        {shift ?
                                            <Shift shift={shift} name={employee.name} />
                                            :
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p>OFF</p>
                                            </div>

                                        }
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Roster;