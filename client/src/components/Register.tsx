
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import { useState , FormEvent} from "react";

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const initialState: User = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

export default function Register(): JSX.Element {
const navigate= useNavigate()
  const [state, setState] = useState<User>(initialState);
  

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
console.log('in handle submit')
    const { email, password, firstName, lastName } = state;
    const newUser: User = { email, password, firstName, lastName };
    const res = await register(newUser);
    if (res.status === 409) {
      alert(`${res.message}`);
      setState(initialState);
    
    } else {
      navigate('/home')
    ;
    }
  };

  const loginHandle = () => {
   navigate('/login')
  };

  const validateForm = (): boolean => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  return (
    <section className="register">
     
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="Surname"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <br></br>
        <button
          className="form-submit"
          type="submit"
          disabled={validateForm()}
        >
          &nbsp;Register&nbsp;
        </button>
      </form>
      <br></br>
      <h3>Already have an Account?</h3>
      <br></br>
      <br></br>
      <button onClick={loginHandle} className="form-submit">
        Login
      </button>
    </section>
  );
}
