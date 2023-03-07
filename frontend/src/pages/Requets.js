import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const Requests = () => {
    const user = useSelector((state) => state.user.value);
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState(null);

    useEffect(() => {
        const getRequests = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://shift-wizard.herokuapp.com/api/getOrganisationRequests/${user.id}`, {
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

    const changeRequestStatus = async (id, status) => {
        setLoading(true)
        try {
            const response = await fetch(`https://shift-wizard.herokuapp.com/api/changeRequestStatus/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status }),
            })
            const json = await response.json();
            if (!response.ok) {
                alert(json.message)
            }
            if (response.ok) {
                const newObject = json.request
                const list = requests.map(obj => {
                    if (obj.id === newObject.id) {
                        return newObject;
                    } else {
                        return obj;
                    }
                });
                setRequests(list)             
            }
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }

    return ( 
        <div className="container">
            <h2>Made Employee Requests</h2>
            {
                loading || requests === null ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={60} />
                    </div> :
                    requests !== null && requests.length === 0 ?
                        <div style={{ textAlign: 'center' }}>
                            <h3>No requests have been made</h3>
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
                                            <IconButton onClick={() => changeRequestStatus(request.id, "approved")} children={<DoneIcon color='success' />} />
                                        </td>
                                        <td>
                                            <IconButton onClick={() => changeRequestStatus(request.id, "declined")} children={<ClearIcon color='error' />} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            }
        </div>
     );
}
 
export default Requests;