import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string("")
    .required()
    .min(8, "Password must be at least 8 characters long"),
});

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [show, setShow] = useState(false);

  const onSubmit = async (info) => {
    const { data } = await axios.post("/api/users/register", info);

    if (data.error) {
      setError("submit", {
        message: "This email address is already in use",
      });
      return;
    }

    setRedirect(true);
    setUser(data.user);
  };
  const onError = (error) => console.log(error);

  if (redirect) return <Redirect to="/items" />;
  if (errors) console.log(errors);

  return (
    <>
      <h1>Register</h1>
      {!!Object.keys(errors).length && (
        <ul className="errors">
          {Object.values(errors).map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...register("name", { required: true })} placeholder="Name" />
        <input {...register("email", { required: true })} placeholder="Email" />
        {/* Show/hide password */}
        {show ? (
          <input
            {...register("password", {
              required: true,
            })}
            placeholder="Password"
          />
        ) : (
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="Password"
          />
        )}
        <button className="btn" type="submit">
          Create Account
        </button>
      </form>
      <button className="btn" onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Password
      </button>
    </>
  );
};

export default Register;
