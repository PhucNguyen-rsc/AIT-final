import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const LoginForm = () => {
  const navigate = useNavigate();
  let message = null;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.errMessage) { //successful
        navigate('/courses', { state: { name: data.username, courses: data.courses}});
      }
      else {
        message = data.errMessage;
      }
  };

  return (  
    <form onSubmit={handleSubmit}>
      {message ? <div className="error">{message}</div> : null}
      <h1>Log In</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();
  let message = null;
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (!data.errMessage) { //successful
        navigate('/courses', { state: { name: data.username, courses: data.courses}});
      }
      else {
        message = data.errMessage;
      }
  };
    return (
      <form onSubmit={handleSubmit}>
        {message ? <div className="error">{message}</div> : null}
        <h1>Register</h1>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    );
}

export {LoginForm, RegisterForm};