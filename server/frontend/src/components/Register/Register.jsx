import React, { useState } from 'react';
import './Register.css'; // Optional: for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8000/djangoapp/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            setMessage(data.message || 'Registration successful!');
            
            // Clear form on success
            if (response.ok) {
                setFormData({
                    username: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <div className="register-container">
            <h2>Sign Up</h2>
            {message && <div className="message">{message}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username *</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Enter your username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your first name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your last name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
