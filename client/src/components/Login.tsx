import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { User } from "./Register";

interface State {
  email: string;
  password: string;
}

const initialState: State = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const moveToRegister = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = state;
    const returningUser = { email: email, password: password };
    const res = await login(returningUser);

    if (res.status === 401 || res.status === 400) {
      alert(res.message);
      setState(initialState);
    } else {
      navigate("/home");
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <section className="register">
      <br />
    
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <br />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
      <p>Don't have an account? Register here</p>
      <button className="form-submit" onClick={moveToRegister}>
        Register
      </button>
    </section>
  );
}

export default Login;
