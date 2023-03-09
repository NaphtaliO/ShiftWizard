import React from 'react';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/employees.css"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { setEmployees } from '../state_management/employeesSlice';

const Employees = () => {
    const user = useSelector((state) => state.user.value);
    const employees = useSelector((state) => state.employees.value);
    const dispatch = useDispatch()

    const deleteEmployee = async (id) => {
        if (window.confirm("You are about to delete this employee permanently")) {
            // console.log(id);
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/deleteEmployee/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (!response.ok) {
                    alert(json.message)
                }
                if (response.ok) {
                    alert(json.message)
                    const list = employees.filter(function (obj) {
                        return obj.id !== id;
                    });
                    dispatch(setEmployees(list))
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            return;
        }
    }

    return (
        <div className="employees">
            <div className="container">
                <h4>Employees</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, i) => (
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
                                        </div>
                                    </div>
                                </td>
                                <td>{employee.job}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <IconButton color='error' children={<DeleteIcon />}
                                        onClick={() => deleteEmployee(employee.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employees;