import React, { useEffect, useState } from 'react';
import '../styles/roster.css';
import { Avatar, CircularProgress } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Shift from './Shift';
import { useParams } from 'react-router-dom';
import AddEmployeeModal from './AddEmployeeModal';
import IconButton from '@mui/material/IconButton';
import AddShiftModal from './AddShiftModal';
import PrintIcon from '@mui/icons-material/Print';
import html2pdf from 'html2pdf.js';
import {useSelector} from 'react-redux'
// import EditEmployeeModal from './EditEmployeeModal';


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

//TODO: update roster to on show shifts with the same roster id
const Roster = () => {
    const user = useSelector((state) => state.user.value)
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [roster, setRoster] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [calDay, setCalDay] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    // const [employee, setEmployee] = useState({});

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

    const generatePDF = () => {
        const element = document.getElementById('table'); // Replace 'table' with the id of your table component
        html2pdf()
            .from(element)
            .save();
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


    return (

        <div className="container">
            {loading || roster === null ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={80}/>
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
                                        <p style={{ textAlign: 'center' }}>{date}</p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {roster && roster.employees.map((employee, i) => (
                                <>
                                    <tr key={i}>
                                        <td>
                                            <div className='names' onClick={() => {
                                                // setEmployee(employee)
                                                // setIsEditEmployeeModalOpen(true);

                                            }}>
                                                <Avatar sx={{ bgcolor: "#000000" }}>
                                                    {employee.name.charAt(0).toUpperCase()}</Avatar>
                                                <div className="details">
                                                    <p>{employee.name}</p>
                                                    <p className='job'>{employee.job}</p>
                                                </div>
                                            </div>
                                            {/* <EditEmployeeModal isOpen={isEditEmployeeModalOpen} setIsOpen={setIsEditEmployeeModalOpen} employee={employee} /> */}
                                        </td>

                                        {dates.map((date, i) => {
                                            // let shift = employee.shifts.filter(shift => shift.startTime === date.split(' ')[0])[0];
                                            let shift = employee.shifts.find(shift => {
                                                let [dayName, day, month] = shift.startTime.split(" ");
                                                return `${dayName} ${day} ${month}` === date;
                                            });
                                            return (
                                                <td key={i}>
                                                    {shift && shift.roster_id === id ?
                                                        <Shift shift={shift} name={employee.name} roster={roster} setRoster={setRoster} />
                                                        :
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <IconButton onClick={() => {
                                                                setCalDay(date)
                                                                setName(employee.name)
                                                                setIsModalOpen(true)

                                                                // console.log(date);
                                                                // console.log(employee.name);

                                                            }} color='primary' children={<AddIcon />} />
                                                        </div>

                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <AddShiftModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id} roster={roster} setRoster={setRoster} employeeName={name} day={calDay} />
                                </>

                            ))
                            }
                        </tbody>
                        {/* <EditEmployeeModal isOpen={isEditEmployeeModalOpen} setIsOpen={setIsEditEmployeeModalOpen} employee={employee} /> */}
                    </table>
                    <div className="add-employee">
                        <IconButton onClick={() => setIsAddEmployeeModalOpen(true)} color='error' size='large' children={<AddCircleIcon fontSize='large' />} />
                    </div>
                    <AddEmployeeModal roster={roster} setRoster={setRoster} isOpen={isAddEmployeeModalOpen} setIsOpen={setIsAddEmployeeModalOpen} roster_id={id} />
                </>}
        </div >

    )
}

export default Roster;

