import {  useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import './ForgetPass.css'

export default function ForgetPass() {
    const [user, setUser] = useState({
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
          const { data } = await axios.patch(
            `${import.meta.env.VITE_API}/auth/forgotPassword`,
            {
              email: user.email,
            }
          );
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
   <div className="d-flex justify-content-center align-items-center containers">
  <div className="cardss py-5 px-3">
    <h5 className="m-0">Code verification</h5><span className="mobile-text">Enter the code we just send to your Email <b className="text-danger">{user.email}
    </b></span>
    <div className="d-flex flex-row mt-5"><input type="text" className="form-control" autoFocus /><input type="text" className="form-control" /><input type="text" className="form-control" /><input type="text" className="form-control" /></div>
    <div className="text-center mt-5"><span className="d-block mobile-text">Didn't receive the code?</span><span className="font-weight-bold text-danger cursorr">Resend</span></div>
  </div>
</div>

   
   </>
  )
}
