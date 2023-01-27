import React from 'react';
import '../styles/dashboard.css';
import NumberCount from '../components/NumberCount';

const Dashboard = () => {
    return (
        <div className="container">
            <div className='number-count'>
                <NumberCount number={0} />
                <NumberCount number={0} />
            </div>
        </div>
    );
}

export default Dashboard;