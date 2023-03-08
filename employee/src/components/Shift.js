import React, { useState } from "react";

// const pickRandomColor = () => {
//     let colors = ["#F55050", "#1F8A70", "#0081B4", "#FFEA20", "#C58940"];
//     let randomColor = colors[Math.floor(Math.random() * colors.length)];
//     return randomColor;
// };

const Shift = ({ shift}) => {
    const [color] = useState('#1976d2');

    return (
        <>
            <div className="shift-item">
                <div
                    className="shift"
                    style={{ backgroundColor: color, color: 'white' }}>
                    <p>
                        {shift.startTime.split(' ')[3]} - {shift.endTime.split(' ')[3]}
                    </p>
                    <p>{shift.description !== "" ? shift.description : null}</p>
                </div>
            </div>
        </>
    );
};

export default Shift;
