import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import axios from "axios";

export default function LoginCom() {
  useEffect(() => {
    document.title = "Login and Registration";
  }, []);
  
  const flipDiv = useRef(null);
  
  const toRegister = () => {
    flipDiv.current.className = "flipper flip-action";
  };
  
  const toLogin = () => {
    flipDiv.current.className = "flipper";
  };
  
  return (
    <div className="flipper" ref={flipDiv}>
      <div className="flippable">
        <Login toRegister={toRegister} />
      </div>
      <div className="register flippable">
        <Register toLogin={toLogin} />
      </div>
    </div>
  );
}

const Login = ({ toRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Something went wrong');
      }

      const result = response.data;
      alert('Login successful: ' + JSON.stringify(result));
      // Handle successful login, e.g., redirect to a dashboard or save auth token
    } 
    catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Welcome back</h2>
      <p className="title">Enter details to login..</p>
      {error && <p className="error">{error}</p>}
      <div className="input-container">
        <input
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Enter password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <strong onClick={toRegister}>Register</strong></p>
    </div>
  );
};

const Register = ({ toLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', { username, email, password });

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong');
      }

      const result = response.data;
      alert('Registration successful: ' + JSON.stringify(result));
      toLogin(); // Flip back to the login form after successful registration
    } 
    catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create account</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-container">
        <input
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Enter password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? 
        <strong onClick={toLogin}>Login</strong></p>
    </div>
  );
};
