import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import "../styles/employees.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const Employees = () => {
    const employees = useSelector((state) => state.employees.value);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                                    <IconButton color='black' children={<MoreVertIcon />} onClick={handleOpenUserMenu} />
                                    <Menu
                                        sx={{ mt: '10px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Edit</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" color={'red'}>Delete</Typography>
                                        </MenuItem>
                                    </Menu>
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