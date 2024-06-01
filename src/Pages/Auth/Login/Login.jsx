import {  useContext, useState } from "react";
import './Login.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { UserContext } from "../../../context/User";


export default function Login() {
  const { setUserToken } = useContext(UserContext);// to make the login page reach the usertoken

  const [user, setUser] = useState({
    email: "",
    password: "",
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
    const LoginSchema = object({
      email: email("Invalid Email").required("Email is required"),
      password: string().min(6).required("Password is required"),
    });

    try {
      await LoginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("Error registering", error.errors);
      setErrors(error.errors);
      setLoader(false);

      return false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validData = await valiData();
    console.log(validData);
    
    try {
      const { data } = axios.post(
        `${import.meta.env.VITE_API}/auth/signin`,
        user
      );

      setUser({
        email: "",
        password: "",
      });

      if (data.message == "success") {
        toast.success("Your account has been created SUCCESFULLY", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(data.token);
        localStorage.setItem("userToken", data.token);//to store the data in local storage as "userToken"
         setUserToken(data.token);// a variable its initial value is null, then it has the userToken
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
      
        toast.error(errors.response.data.message, {
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
    // }
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(user);
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/auth/signin`,
        {
          email: user.email,
          password: user.password,
        }
      );
      if (data.message == "success") {
        navigate("/Home");
        toast.success("Success");
        localStorage.setItem("userToken", data.token);//if the data is valid and succeseeded store the token
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
        <div id="login-box">
          <div className="left">
            <h1>Sign In</h1>

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
              type="submit"
              name="signup_submit"
              value={!loader ? "LOGIN" : "In progress"}
            />

            <button>
              <Link to="/SendCode">Forget Passowrd?</Link>
            </button>
          </div>

          <div className="rights">
            <span className="loginwith">Sign up with</span>

            <button className="social-signin email">
              <Link to="/Register">Register with Email</Link>
            </button>
            <button className="social-signin facebook">
              <Link to="https://www.facebook.com/">Register with Facebook</Link>
            </button>
            <button className="social-signin twitter ">
              <Link to="https://twitter.com/i/flow/login">Register with X</Link>
            </button>
            <button className="social-signin google ">
              <Link to="https://www.google.com/">Register with Google+</Link>
            </button>
          </div>
          <div className="or">OR</div>
        </div>
      </form>
    </>
  );
}