import React, { useState } from 'react';
import '../styles/roster.css'
import { Avatar, Button, Modal, Box, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import Shift from './Shift';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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

//TODO:Get rid of the break tags
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [day, setDay] = useState('');

    const handleChange = (event) => {
        setDay(event.target.value);
    };

    return (
        <div className="container">
            <div className='roster-buttons'>
                <Button variant="contained" startIcon={<AddIcon />} style={{ marginRight: 10 }} onClick={() => setIsModalOpen(true)}>Add Shift</Button>
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
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Add Shift</h2>
                    <p id="parent-modal-description">Add a shift to this roster</p>
                    <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth />
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Day</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={day}
                            label="Day"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Monday</MenuItem>
                            <MenuItem value={20}>Tuesday</MenuItem>
                            <MenuItem value={30}>Wednesday</MenuItem>
                            <MenuItem value={30}>Thursday</MenuItem>
                            <MenuItem value={30}>Friday</MenuItem>
                            <MenuItem value={30}>Saturday</MenuItem>
                            <MenuItem value={30}>Sunday</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(newValue) => {
                                setStartTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        //minTime={moment().hours(8).minutes(59)}
                        />
                        <br />
                        <br />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(newValue) => {
                                setEndTime(newValue)
                                //console.log(newValue.format('h:mmA'));
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            //maxTime={moment().hours(18).minutes(0)}
                            onError={(e) => console.log(e)}

                        />

                        <div className="modal-buttons">
                            <Button variant="contained">Cancel</Button>
                            <Button variant="contained" startIcon={<AddIcon />}>Create</Button>
                        </div>

                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    )
}

export default Roster;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};