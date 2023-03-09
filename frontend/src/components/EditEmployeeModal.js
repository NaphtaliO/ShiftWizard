import React from 'react';
import { Box, Button, Modal } from "@mui/material";

const EditEmployeeModal = ({ isOpen, setIsOpen, employee }) => {
    return ( 
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
            <Box sx={{ ...style, width: 400 }}>
                {/* <Avatar sx={{ bgcolor: "#000000" }}>
                    {employee.name.charAt(0).toUpperCase()}</Avatar> */}
                    <h5 id="parent-modal-title">Edit  hours</h5>
                    <h4 id="parent-modal-description">tt</h4>

                        <div className="modal-buttons">
                            <Button color="error" variant="contained">Cancel</Button>
                            <Button variant="contained">Save</Button>
                        </div>
                </Box>
            </Modal>
     );
}
 
export default EditEmployeeModal;

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