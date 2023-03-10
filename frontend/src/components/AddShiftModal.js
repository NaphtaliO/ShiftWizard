import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Modal, Box, TextField, Button, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';

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

const AddShiftModal = ({ isModalOpen, setIsModalOpen, id, roster, setRoster, employeeName, day }) => {
    const user = useSelector((state) => state.user.value)
    const employees = useSelector((state) => state.employees.value);
    //const [name, setName] = useState(employeeName);
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [loading, setLoading] = useState(false);

    const addShiftToRoster = async (event) => {
        event.preventDefault();
        if (loading) {
            return;
        }
        setLoading(true)
        try {
            const employee_id = await findIdByName(employeeName, employees)
            // console.log({
            //     description, start_time: `${day} ${startTime.format('HH:mm')}`, end_time: `${day} ${endTime.format('HH:mm')}`, roster_id: id, employee_id
            // });
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/roster/addShift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`    },
                body: JSON.stringify({ description, start_time: `${day} ${startTime.format('HH:mm')}`, end_time: `${day} ${endTime.format('HH:mm')}`, roster_id: id, employee_id }),
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
                setDescription("");
                setStartTime(null);
                setEndTime(null);
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false)
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Add Shift</h2>
                <p id="parent-modal-description">Add a shift to this roster</p>
                <form onSubmit={addShiftToRoster}>
                    <TextField id="outlined-basic" label="Description" variant="outlined" type="text"
                        onChange={(e) => setDescription(e.target.value)} value={description} fullWidth required />
                    <br />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(value) => setStartTime(value)}
                            renderInput={(params) => <TextField {...params} fullWidth required />}
                        />
                        <br />
                        <br />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(value) => setEndTime(value)}
                            renderInput={(params) => <TextField {...params} fullWidth required />}
                        />

                        <div className="modal-buttons">
                            {/* <Button variant="contained" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                             */}
                            <div></div>
                            <Button variant="contained" startIcon={<AddIcon />} type='submit'>Create</Button>
                        </div>

                    </LocalizationProvider>
                </form>
                <br />
                {loading ?
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>: null
                }

            </Box>
        </Modal>
    );
}

export default AddShiftModal;

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