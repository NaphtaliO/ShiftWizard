import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { addEmployee, setEmployees } from '../state_management/employeesSlice';
import CircularProgress from '@mui/material/CircularProgress';

//TODO update roster to on show shifts with the same roster id
const Dashboard = () => {
    const user = useSelector((state) => state.user.value)
    const employees = useSelector((state) => state.employees.value)
    console.log(employees);
    const [name, setName] = useState('');
    const [employeeName, setEmployeeName] = useState('')
    const [job, setJob] = useState('')
    const [email, setEmail] = useState('')
    const [employeeError, setEmployeeError] = ('')
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [rosters, setRosters] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getAllRosters = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/getAllRosters/${user.id}`, {
                    method: 'GET'
                })
                const json = await response.json()
                if (response.ok) {
                    setRosters(json)
                    console.log(json);
                }
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false)
        }
        const getAllEmployees = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/organisation/employees/${user.id}`, {
                    method: 'GET'
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch(setEmployees(json))
                }
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false)
        }
        getAllRosters()
        getAllEmployees()
    }, [user.id, dispatch])

    const createRoster = async (event) => {
        setLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/roster/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, organisation_id: user.id }),
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.message)
            }
            if (response.ok) {
                setRosters([json, ...rosters])
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false)
    }


    const createEmployee = async (event) => {
        setLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/employee/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: employeeName, job, email, organisation_id: user.id }),
            })
            const json = await response.json()
            if (!response.ok) {
                setEmployeeError(json.message)
            }
            if (response.ok) {
                dispatch(addEmployee(json.employee))
                setSuccessMessage(json.message)
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <Box sx={{ ...style }}>
                        <form onSubmit={createRoster}>
                            <h2 id="parent-modal-title">Create Roster</h2>
                            <p id="parent-modal-description">Create a roster for this organisation</p>
                            <TextField id="outlined-basic" label="Name" variant="outlined"
                                onChange={(e) => setName(e.target.value)} value={name} fullWidth required />
                            <div className="modal-buttons">
                                <Button color="error" variant="contained" onClick={() => setName('')}>Cancel</Button>
                                <Button variant="contained" startIcon={<AddIcon />} type='submit'>
                                    Create</Button>
                            </div>
                            <div><p>{error}</p></div>
                        </form>
                    </Box>
                    <br /><br />
                    <Box sx={{ ...style }}>
                        <form onSubmit={createEmployee}>
                            <h2 id="parent-modal-title">Add Emplyee</h2>
                            <p id="parent-modal-description">Add employee to organisation</p>
                            <TextField id="outlined-basic1" label="Name" variant="outlined"
                                onChange={(e) => setEmployeeName(e.target.value)} value={employeeName} fullWidth required />
                            <br />
                            <TextField id="outlined-basic2" label="Job" variant="outlined"
                                onChange={(e) => setJob(e.target.value)} value={job} fullWidth required />
                            <br />
                            <TextField id="outlined-basic3" label="Email" variant="outlined" type="email"
                                onChange={(e) => setEmail(e.target.value)} value={email} fullWidth required />
                            <div className="modal-buttons">
                                <Button color="error" variant="contained" onClick={() => setEmployeeName('')}>Cancel</Button>
                                <Button variant="contained" startIcon={<AddIcon />} type='submit'>
                                    Create</Button>
                            </div>
                            <br />
                            <div><p style={{ color: "red" }}>{employeeError}</p></div>
                            <div><p style={{ color: "green" }}>{successMessage}</p></div>
                        </form>
                    </Box>
                </div>
                <div className="col-8">
                    {loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </div>
                        :
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>Employees</th>
                                    <th>Shifts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rosters.map((roster, i) => (
                                    <tr key={i}>

                                        <td>
                                            <button onClick={() => navigate(`/roster/${roster.id}`)}>
                                                {roster.id}
                                            </button>
                                        </td>
                                        <td>{roster.name}</td>
                                        <td>{roster.employees.length}</td>
                                        <td>{
                                            roster.employees.reduce((acc, employee) => {
                                                return acc + employee.shifts.length;
                                            }, 0)
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

const style = {
    //position: 'relative',
    width: '100%',
    bgcolor: 'background.paper',
    border: '.5px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};