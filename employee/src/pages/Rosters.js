import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Rosters = () => {
    const user = useSelector((state) => state.user.value)
    const [rosters, setRosters] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const getAllRosters = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/getAllEmployeeRosters/${user.id}`, {
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
        getAllRosters()
    }, [user.id, user.token])
    return (
        <div className="container">
            {loading || rosters === null ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress size={60} />
                </div>
                :
                rosters !== null && rosters.length === 0 ?
                    <div className='no-rosters'><h3>You do not belong to any rosters</h3></div>
                    :
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>name</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default Rosters;