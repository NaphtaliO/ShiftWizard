import React, { useEffect, useState } from 'react';
import { Avatar, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import Shift from '../components/Shift';
import html2pdf from 'html2pdf.js';

const Roster = () => {
    const user = useSelector((state) => state.user.value)
    const { id } = useParams();
    const [roster, setRoster] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [loading, setLoading] = useState(true);

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let date = new Date();
    let day = date.getUTCDay();
    let monday = new Date(date.getTime() - (day - 1) * 86400000);

    let dates = [];
    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(monday.getTime() + (i + currentWeek * 7) * 86400000);
        let dayName = days[currentDate.getUTCDay()];
        let month = currentDate.toLocaleString('default', { month: 'short' });
        let day = currentDate.getUTCDate();
        dates.push(`${dayName} ${day} ${month}`);
    }

    const handleNextWeek = () => {
        if (currentWeek < 3) {
            setCurrentWeek(currentWeek + 1);
        }
    };

    const handlePrevWeek = () => {
        if (currentWeek > -3) {
            setCurrentWeek(currentWeek - 1);
        }
    };

    useEffect(() => {
        const fetchRoster = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/roster/view/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (!response.ok) {
                    alert(json.messsage);
                }
                if (response.ok) {
                    setRoster(json)
                }
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
        }
        fetchRoster()
    }, [id, user.token])

    const generatePDF = () => {
        const element = document.getElementById('table'); // Replace 'table' with the id of your table component
        html2pdf()
            .from(element)
            .save();
    };

    return (
        <div className="container">
            {loading || roster === null ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress size={80} />
                </div> :
                <>
                    <div className='roster-buttons'>
                        <div className='calendar-text'>
                            <h4>{`${dates[0]} - ${dates[6]}, 2023`}</h4>
                        </div>
                        <div className='' style={{ marginLeft: 'auto' }}>
                            <button style={{ marginRight: 7 }} className='btn btn-outline-primary' onClick={handlePrevWeek}>
                                &lt;
                            </button>
                            <button className='btn btn-outline-primary' onClick={() => setCurrentWeek(0)}>Today</button>
                            <button style={{ marginLeft: 7 }} className='btn btn-outline-primary' onClick={handleNextWeek}>
                                &gt;
                            </button>

                        </div>
                        <div style={{ marginRight: 10, marginLeft: 10 }}>
                            <IconButton color='primary' children={<PrintIcon fontSize='large' />} size='large' onClick={generatePDF} />
                        </div>


                        {/* <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => alert("delete ?")}>Delete Roster</Button> */}
                    </div>
                    <table className='table table-striped' id='table'>
                        {/* tale-dark is an option */}
                        <thead>
                            <tr>
                                <th scope='col'></th>
                                {dates.map((date, i) => (
                                    <th scope='col' key={i}>
                                        <p style={{ textAlign: 'center' }} key={i}>{date}</p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {roster && roster.employees.map((employee, i) => (
                                <>
                                    <tr key={i}>
                                        <td>
                                            <div className='names' onClick={() => {}}>
                                                <Avatar sx={{ bgcolor: "#000000" }}>
                                                    {employee.name.charAt(0).toUpperCase()}</Avatar>
                                                <div className="details">
                                                    <p>{employee.name}</p>
                                                    <p className='job'>{employee.job}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {dates.map((date, i) => {
                                            let shift = employee.shifts.find(shift => {
                                                let [dayName, day, month] = shift.startTime.split(" ");
                                                return `${dayName} ${day} ${month}` === date;
                                            });
                                            return (
                                                <td key={i}>
                                                    {shift && shift.roster_id === id ?
                                                        <Shift shift={shift}/>
                                                        :
                                                        null

                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                </>

                            ))
                            }
                        </tbody>
                    </table>
                </>}
        </div >
    );
}

export default Roster;