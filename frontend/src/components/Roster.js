import React, { useEffect, useState } from 'react';
import '../styles/roster.css'
import { Avatar, Button, Modal, Box, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import Shift from './Shift';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useParams } from 'react-router-dom';
import AddEmployeeModal from './AddEmployeeModal';

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

function findIdByName(name, list) {
    if (name === '') {
        return;
    }
    for (const obj of list) {
        if (obj.name === name) {
            return obj.id;
        }
    }
    return null;
}

//TODO:Get rid of the break tags
// const employees = [
//     {
//         id: 1,
//         name: "Naphtali",
//         job: "Chef",
//         shifts: [
//             {
//                 description: "Kitchen", //optional
//                 day: "Mon",
//                 startTime: "09:00",
//                 endTime: "17:00"
//             },
//             {
//                 description: "Canteen", //optional
//                 day: "Wed",
//                 startTime: "09:00",
//                 endTime: "17:00"
//             },
//             {
//                 description: "Student Center", //optional
//                 day: "Fri",
//                 startTime: "09:00",
//                 endTime: "17:00"
//             },
//         ]
//     }
// ]

//TODO update roster to on show shifts with the same roster id
const Roster = () => {
    const { id } = useParams();
    const employees = useSelector((state) => state.employees.value)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [day, setDay] = useState('');
    const [description, setDescription] = useState('')
    const [roster, setRoster] = useState(null)
    const [employee, setEmployee] = useState('');

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/roster/view/${id}`, {
                    method: 'GET',
                })
                const json = await response.json()
                if (!response.ok) {
                    console.log(json.message);
                }
                if (response.ok) {
                    setRoster(json)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchRoster()
    }, [id])

    const addShiftToRoster = async (event) => {
        event.preventDefault();
        try {
            const employee_id = findIdByName(employee, employees)
            //console.log({description, day, start_time: startTime.format('HH:mm'), end_time: endTime.format('HH:mm'), roster_id: id, employee_id });
            const response = await fetch(`http://127.0.0.1:5000/api/roster/addShift`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, day, start_time: startTime.format('HH:mm'), end_time: endTime.format('HH:mm'), roster_id: id, employee_id }),
            })
            const json = await response.json()
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                let list = roster.employees;
                let newObject = json.employee
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === newObject.id) {
                        list[i] = newObject;
                        break;
                    }
                }
                setRoster({ ...roster, employees: list })
                setIsModalOpen(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }



    const handleChange = (event) => {
        setDay(event.target.value);
    };

    return (
        <div className="container">
            <div className='roster-buttons'>
                <Button variant="contained" startIcon={<AddIcon />} style={{ marginRight: 10 }} onClick={() => setIsAddEmployeeModalOpen(true)}>Add Employee</Button>
                <Button variant="contained" startIcon={<AddIcon />} style={{ marginRight: 10 }} onClick={() => setIsModalOpen(true)}>Add Shift</Button>
                <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => alert("delete?")}>Delete Roster</Button>
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
                    {roster && roster.employees.map((employee, i) => (
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
                    ))
                    }
                </tbody>
            </table>
            <AddEmployeeModal roster={roster} setRoster={setRoster} isOpen={isAddEmployeeModalOpen} setIsOpen={setIsAddEmployeeModalOpen} roster_id={id} />
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Add Shift</h2>
                    <p id="parent-modal-description">Add a shift to this roster</p>
                    <form onSubmit={addShiftToRoster}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={employee}
                                label="Employee"
                                onChange={(e) => setEmployee(e.target.value)}
                                required
                            >
                                {employees.map((employee, i) => (
                                    <MenuItem key={i} value={employee.name}>{employee.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br /><br />
                        <TextField id="outlined-basic" label="Description" variant="outlined" type="text"
                            onChange={(e) => setDescription(e.target.value)} value={description} fullWidth required />
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
                                required
                            >
                                <MenuItem value={'Mon'}>Monday</MenuItem>
                                <MenuItem value={'Tue'}>Tuesday</MenuItem>
                                <MenuItem value={'Wed'}>Wednesday</MenuItem>
                                <MenuItem value={'Thu'}>Thursday</MenuItem>
                                <MenuItem value={'Fri'}>Friday</MenuItem>
                                <MenuItem value={'Sat'}>Saturday</MenuItem>
                                <MenuItem value={'Sun'}>Sunday</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <TimePicker
                                required
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
                                required
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
                                <Button variant="contained" startIcon={<AddIcon />} type='submit'>Create</Button>
                            </div>

                        </LocalizationProvider>
                    </form>
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