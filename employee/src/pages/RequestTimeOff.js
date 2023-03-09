import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Modal, Box, TextField, Button, LinearProgress, FormControl, InputLabel, IconButton, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const RequestTimeOff = () => {
    const user = useSelector((state) => state.user.value)
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(false);
    const [type_of_request, settype_of_request] = useState("");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState("");

    useEffect(() => {
        const getRequests = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/getEmployeeRequests/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json();
                if (!response.ok) {
                    alert(json.message)
                }
                if (response.ok) {
                    setRequests(json.requests)
                }
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
        }
        getRequests()
    }, [user.id, user.token])

    const makeRequest = async (event) => {
        event.preventDefault();
        try {
            //console.log({ type_of_request, status: 'pending', message, employee_id: user.id, organisation_id: user.organisation_id });
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/makeRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`    },
                body: JSON.stringify({ type_of_request, status: 'pending', message, employee_id: user.id, organisation_id: user.organisation_id }),

            })
            const json = await response.json();
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                setRequests([json.request, ...requests])
                setMessage("")
                settype_of_request("")
                setIsModalOpen(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteRequest = async (id) => {
        try {
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/deleteRequest/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                alert(json.message)
                const list = requests.filter(function (obj) {
                    return obj.id !== id;
                });
                setRequests(list)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Make A Request</h2>
                <Button
                    style={{ marginLeft: 'auto' }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, }}
                    onClick={() => setIsModalOpen(true)}
                >Make a Request</Button>
            </div>
            {
                loading || requests === null ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={60} />
                    </div> :
                    requests !== null && requests.length === 0 ?
                        <div style={{ textAlign: 'center' }}>
                            <h3>You have made no requests.</h3>
                            <p>Click the button above to make one</p>
                        </div>
                        :
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request, i) => (
                                    <tr key={i}>
                                        <td>{request.type_of_request}</td>
                                        <td><p style={{
                                            color: request.status === "pending" ?
                                                "#FFBF00" :
                                                request.status === "approved" ?
                                                    "green" :
                                                    request.status === "declined" ?
                                                        "red" : ""
                                        }}>{request.status.toUpperCase()}</p></td>
                                        <td>{request.message}</td>
                                        <td>
                                            <IconButton onClick={() => deleteRequest(request.id)} children={<DeleteIcon color='error' />} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            }
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Make a Request</h2>
                    <p id="parent-modal-description"></p>
                    <form onSubmit={makeRequest}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type_of_request}
                                label="Type"
                                onChange={(e) => settype_of_request(e.target.value)}
                            >
                                <MenuItem value={"Time-Off Holiday"}>Time-Off Holiday</MenuItem>
                                <MenuItem value={"Time-Off Personal"}>Time-Off Personal</MenuItem>
                                <MenuItem value={"Time-Off Sick"}>Time-Off Sick</MenuItem>
                                <MenuItem value={"Time-Off Sick"}>Shift Swap</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <TextField id="outlined-basic" label="Message" variant="outlined" type="text" placeholder='Explain thoroughly'
                            onChange={(e) => setMessage(e.target.value)} value={message} fullWidth required />
                        <br />
                        <br />
                        <div className="modal-buttons">
                            <div></div>
                            <Button variant="contained" startIcon={<AddIcon />} type='submit'>Create</Button>
                        </div>

                    </form>
                    <br />
                    {loading ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box> : null
                    }

                </Box>
            </Modal>
        </div>
    );
}

export default RequestTimeOff;

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