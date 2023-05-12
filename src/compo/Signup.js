import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    password: "",
    email: "",
  });

  let history = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:4001/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json) {
      localStorage.setItem('authtoken',response.json.token)
      history("/login");
    } else {
      alert("wrong credentials");
    }
  
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            onChange={onchange}
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            onChange={onchange}
            value={credentials.password}
            name="password"
            id="password"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            onChange={onchange}
            value={credentials.name}
            name="name"
            id="fullName"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
