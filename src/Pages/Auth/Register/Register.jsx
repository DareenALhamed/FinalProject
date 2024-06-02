import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
    image: null,
  });

  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]); //to show the error in the page for the user

  const handelChange = (e) => {
    //when any change occurs call this function
    const { name, value } = e.target; //get the name and value from the user to put in in the name and value at the input field

    setUser({
      // when any change occured at the input, the user in useState changes the value
      ...user, //Old Data
      [name]: value, //New Data insted of the old one
    });
  };

  const handelImageChange = (e) => {
    const { name, files } = e.target;

    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const valiData = async () => {
    //to make the number of request return to the backend less
    const RegisterSchema = object({
      userName: string().max(10).required("User name is required"),
      email: string().email("Invalid Email").required("Email is required"),
      password: string().min(6).required("Password is required"),
      password2: string().min(6).required("Password is required"),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false }); //to compare it with user /abortEarly is show just one error because its default value is true, so when make it false, it will show all the errors
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
    if (loader) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <SmallLoading color="blue" size={100} />
        </div>
      );
    }



    const validData = await valiData();
    console.log(validData);
    
    

    if (await valiData()) {
      const formData = new FormData(); //we need it because there are an image, if there is not we can just use const {data}=await axios.post(the api link, data to the backend)
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
      
      try {
        const { data } = await axios.post(
          `/auth/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        setUser({
          userName: "",
          email: "",
          password: "",
          image: null,
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
          navigate("/Login");
        }
      } 
      catch (error) {
        console.log("error");

       
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        
      }
      
    


       finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : null}
      
      <form onSubmit={handelSubmit}>
        <div id="login-box">
          <div className="left">
            <h1>Sign up</h1>

            <input
              type="text"
              className="text"
              name="userName"
              placeholder="UserName"
              value={user.userName}
              onChange={handelChange}
            />

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
              name="password2"
              className="pass"
              placeholder="Retype password"
              value={user.password2}
              onChange={handelChange}
            />
            <input
              type="file"
              name="image"
              //value={user.image}
              onChange={handelImageChange}
            />

            <input
              type="submit"
              name="signup_submit"
              value={!loader ? "Sign me up" : "In progress"}
            />
          </div>

          <div className="rights">
            <span className="loginwith">Sign in with</span>

            <button className="social-signin email">
              <Link to="/Login">Sign In with Email</Link>
            </button>
            <button className="social-signin facebook">
              <Link to="https://www.facebook.com/">Sign In with Facebook</Link>
            </button>
            <button className="social-signin twitter">
              {" "}
              <Link to="https://twitter.com/i/flow/login">Sign In with X</Link>
            </button>
            <button className="social-signin google">
              {" "}
              <Link to="https://www.google.com/">Sign In with Google+</Link>
            </button>
          </div>
          <div className="or">OR</div>
        </div>
      </form>
    </>
  );
}


