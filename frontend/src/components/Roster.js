import React, { useEffect, useState } from 'react';
import '../styles/roster.css';
import { Avatar} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Shift from './Shift';
import { useParams } from 'react-router-dom';
import AddEmployeeModal from './AddEmployeeModal';
import IconButton from '@mui/material/IconButton';
import AddShiftModal from './AddShiftModal';


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
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [roster, setRoster] = useState(null);
    console.log(roster);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [value, setValue] = useState(null);
    const [calDay, setCalDay] = useState("");

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


    return (
        <div className="container">

            <div className='roster-buttons'>
                <div>
                    <h4>{`${dates[0]} - ${dates[6]}`}</h4>
                </div>
                <div>
                    <button onClick={handlePrevWeek}>
                        &lt;
                    </button>
                    <button onClick={() => setCurrentWeek(0)}>Today</button>
                    <button onClick={handleNextWeek}>
                        &gt;
                    </button>
                </div>

                {/* <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={() => alert("delete ?")}>Delete Roster</Button> */}
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
                        <>
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
                                {dates.map((date, i) => {
                                    // let shift = employee.shifts.filter(shift => shift.startTime === date.split(' ')[0])[0];
                                    let shift = employee.shifts.find(shift => {
                                        let [dayName, day, month] = shift.startTime.split(" ");
                                        return `${dayName} ${day} ${month}` === date;
                                    });
                                    console.log(shift);
                                    return (
                                        <td key={i}>
                                            {shift && shift.roster_id === id ?
                                                <Shift shift={shift} name={employee.name} />
                                                :
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconButton onClick={() => {
                                                        //console.log(date);
                                                        setCalDay(date)
                                                        setIsModalOpen(true)
                                                        
                                                    }} color='primary' children={<AddIcon />} />
                                                </div>

                                            }
                                        </td>
                                    )
                                })}
                            </tr>
                            <AddShiftModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id} roster={roster} setRoster={setRoster} employeeName={employee.name} day={ calDay } />
                        </>

                    ))
                    }
                </tbody>
            </table>
            <div className="add-employee">
                <IconButton onClick={() => setIsAddEmployeeModalOpen(true)} color='error' size='large' children={<AddCircleIcon fontSize='large' />} />
            </div>
            <AddEmployeeModal roster={roster} setRoster={setRoster} isOpen={isAddEmployeeModalOpen} setIsOpen={setIsAddEmployeeModalOpen} roster_id={id} />
        </div>
    )
}

export default Roster;

