import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { setEmployees } from '../state_management/employeesSlice';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

//TODO update roster to on show shifts with the same roster id
const Dashboard = () => {
    const user = useSelector((state) => state.user.value)
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [rosters, setRosters] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getAllRosters = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/getAllRosters/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok) {
                    setRosters(json)
                }
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false)
        }
        const getAllEmployees = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/organisation/employees/${user.id}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${user.token}` }
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
    }, [user.id, dispatch, user.token])

    const createRoster = async (event) => {
        setLoading(true);
        try {
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/roster/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`    },
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
        setLoading(false);
    }

    const deleteRoster = async (id) => {
        if (window.confirm("You are about to delete this roster permanently")) {
            if (loading) {
                return;
            }
            setLoading(true)
            try {
                if (id === "") return;
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/deleteRoster/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (!response.ok) {
                    setError(json.message)
                }
                if (response.ok) {
                    const list = rosters.filter(function (obj) {
                        return obj.id !== id;
                    });
                    setRosters(list)
                    alert(json.message);
                }
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false)
        } else {
            return;
        }
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
                                    Create
                                </Button>
                            </div>
                            <div><p>{error}</p></div>
                        </form>
                    </Box>
                </div>
                <div className="col-8">
                    {loading || rosters === null ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress size={60}/>
                        </div>
                        :
                        rosters !== null && rosters.length === 0 ?
                            <div className='no-rosters'><h3>You have no current rosters. Why not create one  :)</h3></div>
                            :
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Employees</th>
                                        <th>Shifts</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {rosters !== null && rosters.length !== 0 && rosters.map((roster, i) => (
                                        <tr key={i} className='dashboard'>
                                            <td>
                                                <button className='rosters-link' onClick={() => navigate(`/roster/${roster.id}`)}>
                                                    VIEW ROSTER
                                                </button>
                                            </td>
                                            <td>{roster.name}</td>
                                            <td>{roster.employees.length}</td>
                                            <td>{
                                                roster.employees.reduce((acc, employee) => {
                                                    return acc + employee.shifts.length;
                                                }, 0)
                                            }</td>
                                            <td>
                                                <IconButton color='error' children={<DeleteIcon />} onClick={() => deleteRoster(roster.id)} />
                                            </td>
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