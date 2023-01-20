import React, { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {

    }

    return (
        <div className="custom-container">
            <h1 className='signup'>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Organisation Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Address: </label>
                    <textarea type="text" onChange={(e) => setAddress(e.target.value)} value={address} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" />
                </div>
                <button type='submit' className="btn btn-dark sign-up-button">Sign up</button>
            </form>
        </div>

    )
}

export default Signup;
