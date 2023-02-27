import React, { useState } from 'react';
import { Button, Modal, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

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



const AddEmployeeModal = ({ isOpen, setIsOpen, roster_id, setRoster, roster }) => {
    const employees = useSelector((state) => state.employees.value);
    const [employee, setEmployee] = useState('')

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

    const addEmployeeToRoster = async (event) => {
        event.preventDefault();
        try {
            const employee_id = findIdByName(employee, employees)
            const response = await fetch(`http://127.0.0.1:5000/api/roster/addEmployee`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roster_id, employee_id }),
            })
            const json = await response.json()
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                setIsOpen(false)
                setRoster(json.roster)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleChange = (event) => {
        setEmployee(event.target.value);
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Add Employee</h2>
                <p id="parent-modal-description">Add an employee to the roster</p>
                {/* <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth />
                <br />
                <br /> */}
                <form onSubmit={addEmployeeToRoster}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={employee}
                            label="Employee"
                            onChange={handleChange}
                            required
                        >
                            {employees.map((employee, i) => (
                                <MenuItem key={i} value={employee.name}>{employee.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />

                    <div className="modal-buttons">
                        <Button color="error" variant="contained" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="contained" startIcon={<AddIcon />} type='submit'>Add</Button>
                    </div>
                </form>

            </Box>
        </Modal>
    );
}

export default AddEmployeeModal;