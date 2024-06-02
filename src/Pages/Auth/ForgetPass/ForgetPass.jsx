import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import "./ForgetPass.css";

export default function ForgetPass() {
  const [user, setUser] = useState({
    email: "",

    password: "",

    code: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user, //to keep the original value
      [name]: value, // between the braackets because its dynamic
    });
  };

  const valiData = async () => {
    const ResetSchema = object({
      email: string().email("Invalid Email").required("Email is required"),
      password: string().min(6).required("Password is required"),
      code: code("Invalid Code"),
    });

    try {
      await ResetSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("Invalid", error.errors);
      setErrors(error.errors);
      setLoader(false);

      return false;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.patch(`/auth/forgotPassword`, {
        email: user.email,
        password: user.password,
        code: user.code,
      });
      if (data.message == "success") {
        navigate("/ResetPassword");
        toast.success("Success");
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoader(false);
    }
  }; //to submit the form to send it to the back end
  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          className="text"
          name="email"
          placeholder="E-mail"
          value={user.email}
          onChange={handelChange}
        />

        <input
          type="password"
          className="pass"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handelChange}
        />
        <input
          type="password"
          className="pass"
          name="code"
          placeholder="Code"
          value={user.code}
          onChange={handelChange}
        />
        <input
          type="submit"
          name="signup_submit"
          value={!loader ? "Reset Password" : "In progress"}
        />
      </form>
    </>
  );
}
