import {  useState } from "react";
import './Login.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
// import { UserContext } from "./../../contex/User";

export default function Login() {
//   const { setUserToken } = useContext(UserContext);

  const [user, setUser] = useState({
    password: "",
    confirm: "",
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
      
      password: string().min(6).required("Password is required"),
      confirm: string().min(6).required("Password is required"),
    });

    try {
      await ResetSchema.validate(user, { abortEarly: false });
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
        
        password: "",
        confirm: "",
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
        localStorage.setItem("userToken", data.token);//to store the data in local storage
        // setUserToken(data.token);
        navigate("/Login");
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
          
          password: user.password,
          confirm: user.confirm,
        }
      );
      if (data.message == "success") {
        navigate("/Home");
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
        <div id="login-box">
          <div className="left">
            <h1>Reset Password</h1>

            
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
              name="confirm"
              placeholder="Confirm Password"
              value={user.confirm}
              onChange={handelChange}
            />


            <input
              type="submit"
              name="signup_submit"
              value={!loader ? "Reset Password" : "In progress"}
            />

            <button>
              <Link to="/Login">Forget Passowrd?</Link>
            </button>
          </div>

          
        </div>
      </form>
    </>
  );
}