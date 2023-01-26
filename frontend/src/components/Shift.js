import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

const pickRandomColor = () => {
    let colors = ["#F55050", "#1F8A70", "#0081B4", "#FFEA20", "#C58940"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
};

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

const Shift = ({ shift, name }) => {
    const [opacity, setOpacity] = useState(1);
    const [color] = useState(pickRandomColor());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startTime, setStartTime] = useState(moment(shift.startTime, "HH:mm"));
    const [endTime, setEndTime] = useState(moment(shift.endTime, "HH:mm"));

    const handleMouseEnter = () => {
        setOpacity(0.6);
    };

    const handleMouseLeave = () => {
        setOpacity(1);
    };

    const handleClick = () => {
        setIsModalOpen(true)
    };

    const handleClose = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <div className="shift-item">
                <div
                    className="shift"
                    style={{ backgroundColor: color, opacity: opacity }}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <p>
                        {shift.startTime} - {shift.endTime}
                    </p>
                    <p>{shift.description !== "" ? shift.description : null}</p>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Edit {name}'s hours</h2>
                    <p id="parent-modal-description">{shift.description}</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Shift Start"
                            value={startTime}
                            onChange={(newValue) => {
                                setStartTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            minTime={moment().hours(8).minutes(59)}
                        />
                        <br />
                        <br />
                        <TimePicker
                            label="Shift End"
                            value={endTime}
                            onChange={(newValue) => {
                                setEndTime(newValue)
                                //console.log(newValue.format('h:mmA'));
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            maxTime={moment().hours(18).minutes(0)}
                            onError={(e)=>console.log(e)}
                            
                        />

                        <div className="modal-buttons">
                            <Button color="error" variant="contained" startIcon={<DeleteIcon />}>Delete Shift</Button>
                            <Button variant="contained">Cancel</Button>
                            <Button variant="contained">Save</Button>
                        </div>

                    </LocalizationProvider>
                </Box>
            </Modal>
        </>
    );
};

export default Shift;
