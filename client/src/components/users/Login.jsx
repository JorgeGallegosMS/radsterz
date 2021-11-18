import { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { email, password };
    const { data } = await axios.post("/api/users/login", credentials);
    console.log(data);

    if (data.error) {
      <Redirect to="/login" />;
      setErrors({ ...errors, login: { message: data.error } });
      return;
    }

    setRedirect(true);
    setUser(data.user);
  };

  if (redirect) return <Redirect to="/items" />;

  return (
    <>
      <h1>Login</h1>
      {!!Object.keys(errors).length && (
        <ul className="errors">
          {Object.values(errors).map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {show ? (
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        ) : (
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        )}
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <button className="btn" onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Password
      </button>
    </>
  );
};

export default Login;
