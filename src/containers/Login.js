import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3000/user/log-in", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} className="signinForm">
        <h2>Se connecter</h2>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <input type="submit" className="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
