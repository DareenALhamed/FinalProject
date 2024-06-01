import {  useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";

export default function SendCode() {


    const [user, setUser] = useState({
        email: "",
      });
      const navigate = useNavigate();
      const [errors, setErrors] = useState([]);
      const [loader, setLoader] = useState(false);
    
      const handelEmailChange = (e) => {
        const { name, value } = e.target;
    
        setUser({
          ...user, //to keep the original value
          [name]: value, // between the braackets because its dynamic
        });
      };
    
      const valiData = async () => {
        const ResetSchema = object({
          email: email("Invalid Email").required("Email is required"),
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
          const { data } = await axios.patch(
            `${import.meta.env.VITE_API}/auth/sendcode`,
            {
              email: user.email,
            }
          );
          if (data.message == "success") {
            navigate("/ResetPassword");
            toast.success("Please Check your Email");
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
              type="text"
              className="text"
              name="email"
              placeholder="E-mail"
              value={user.email}
              onChange={handelEmailChange}
            />
            

            <input
              type="submit"
              name="signup_submit"
              value={!loader ? "Send Code" : "In progress"}
            />

        
          </div>

          
         
        </div>
      </form>
   </>
  )
}
