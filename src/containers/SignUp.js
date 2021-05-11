import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3000/user/sign-up", {
        email: email,
        username: username,
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
        <h2>S'inscrire</h2>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <input type="submit" className="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignUp;
