import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../state_management/userSlice';

const Signup = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/organisation/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, address, email, password }),
                
            })
            const json = await response.json();
            if (!response.ok) {
                setError(json.message)
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                dispatch(logIn(json))
            }
            console.log(json);
            
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="custom-container">
            <h1 className='signup'>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Organisation Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Address: </label>
                    <textarea type="text" onChange={(e) => setAddress(e.target.value)} value={address} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address:</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" required />
                </div>
                {error !== "" ? <div className="error" style={{ color: 'red' }}>
                    <p>{error}</p></div> : null}
                <button type='submit' className="btn btn-dark sign-up-button">Sign up</button>
            </form>
        </div>

    )
}

export default Signup;
