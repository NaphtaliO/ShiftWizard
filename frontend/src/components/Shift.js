import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

const pickRandomColor = () => {
    let colors = ["#F55050", "#1F8A70", "#0081B4", "#FFEA20", "#C58940"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
};

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

const Shift = ({ shift, name, roster, setRoster }) => {
    const [opacity, setOpacity] = useState(1);
    const [color] = useState(pickRandomColor());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startTime, setStartTime] = useState(moment(shift.startTime.split(' ')[3], "HH:mm"));
    const [endTime, setEndTime] = useState(moment(shift.endTime.split(' ')[3], "HH:mm"));
    const [description, setDescription] = useState(shift.description);
    const st = `${shift.startTime.split(' ')[0]} ${shift.startTime.split(' ')[1]} ${shift.startTime.split(' ')[2]}`;
    const et = `${shift.endTime.split(' ')[0]} ${shift.endTime.split(' ')[1]} ${shift.endTime.split(' ')[2]}`;
console.log(roster);
    const editShift = async (event) => {
        event.preventDefault();
        try {
            //console.log({ description, start_time: `${st} ${startTime.format('HH:mm')}`, end_time: `${et} ${endTime.format('HH:mm')}`, shift_id: shift.id });
            const response = await fetch(`http://127.0.0.1:5000/api/editShift`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, start_time: `${st} ${startTime.format('HH:mm')}`, end_time: `${et} ${endTime.format('HH:mm')}`, shift_id: shift.id }),
            })
            const json = await response.json()
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                // Find the employee and the shift to update
                const employee = roster.employees.find((employee) =>
                    employee.shifts.some((shift) => shift.id === json.id)
                );
                const shift = employee.shifts.find((shift) => shift.id === json.id);

                // Update the shift
                const updatedShifts = employee.shifts.map((s) =>
                    s.id === json.id ? { ...shift, ...json } : s
                );

                // Update the employee
                const updatedEmployees = roster.employees.map((e) =>
                    e.id === employee.id ? { ...employee, shifts: updatedShifts } : e
                );

                // Update the state
                setRoster({ ...roster, employees: updatedEmployees });
                setIsModalOpen(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="shift-item">
                <div
                    className="shift"
                    style={{ backgroundColor: color, opacity: opacity }}
                    onClick={() => setIsModalOpen(true)}
                    onMouseEnter={() => setOpacity(0.6)}
                    onMouseLeave={() => setOpacity(1)}>
                    <p>
                        {shift.startTime.split(' ')[3]} - {shift.endTime.split(' ')[3]}
                    </p>
                    <p>{shift.description !== "" ? shift.description : null}</p>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <h5 id="parent-modal-title">Edit {name}'s hours</h5><h4 id="parent-modal-description">{shift.description}</h4>
                    <form onSubmit={editShift}>
                        <TextField id="outlined-basic" label="Description" variant="outlined" type="text"
                            onChange={(e) => setDescription(e.target.value)} value={description} fullWidth />
                        <br /><br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Shift Start"
                                value={startTime}
                                onChange={(newValue) => {
                                    setStartTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth required />}
                                minTime={moment().hours(8).minutes(59)}
                            />
                            <br />
                            <br />
                            <TimePicker
                                label="Shift End"
                                value={endTime}
                                onChange={(newValue) => {
                                    setEndTime(newValue)
                                    //console.log(newValue.format('h:mmA'));
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth required />}
                                // maxTime={moment().hours(18).minutes(0)}
                                onError={(e) => console.log(e)}

                            />

                            <div className="modal-buttons">
                                <Button color="error" variant="contained" startIcon={<DeleteIcon />}>Delete Shift</Button>
                                <Button variant="contained" type="submit">Save</Button>
                            </div>

                        </LocalizationProvider>
                    </form>

                </Box>
            </Modal>
        </>
    );
};

export default Shift;
