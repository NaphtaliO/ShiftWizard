import React, { useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../state_management/employeesSlice';


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
    const user = useSelector((state) => state.user.value);
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [email, setEmail] = useState('')
    const [employeeError, setEmployeeError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();

    const createEmployee = async (event) => {
        event.preventDefault();
        try {
            //console.log("created");
            const response = await fetch(`http://127.0.0.1:5000/api/employee/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, job, email, organisation_id: user.id, roster_id }),
            })
            const json = await response.json()
            if (!response.ok) {
                setEmployeeError(json.message)
            }
            if (response.ok) {
                setSuccessMessage(json.message)
                dispatch(addEmployee(json.employee))
                setRoster(json.roster)
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

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
                <form onSubmit={createEmployee}>
                    <TextField id="outlined-basic1" label="Name" variant="outlined"
                        onChange={(e) => setName(e.target.value)} value={name} fullWidth required />
                    <br /><br />
                    <TextField id="outlined-basic2" label="Job" variant="outlined"
                        onChange={(e) => setJob(e.target.value)} value={job} fullWidth required />
                    <br /><br />
                    <TextField id="outlined-basic3" label="Email" variant="outlined" type="email"
                        onChange={(e) => setEmail(e.target.value)} value={email} fullWidth required />
                    <div className="modal-buttons">
                        <Button color="error" variant="contained" onClick={() => setName('')}>Cancel</Button>
                        <Button variant="contained" startIcon={<AddIcon />} type='submit'>
                            Create</Button>
                    </div>
                    <br /><br />
                    {
                        employeeError !== "" || successMessage !== "" ?
                            <>
                                <div><p style={{ color: "red" }}>{employeeError}</p></div>
                                <div><p style={{ color: "green" }}>{successMessage}</p></div>
                            </>
                            : null
                    }
                    <div><p style={{ color: "red" }}>{employeeError}</p></div>
                    <div><p style={{ color: "green" }}>{successMessage}</p></div>
                </form>
                {/* <form onSubmit={addEmployeeToRoster}>
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
                </form> */}
            </Box>
        </Modal>
    );
}

export default AddEmployeeModal;