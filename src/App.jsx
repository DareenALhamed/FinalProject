import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Routes/Root";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./Pages/Auth/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './Pages/Auth/Login/Login';
import NProtected from './Components/Protected/NProtected';
import ForgetPass from "./Pages/Auth/ForgetPass/ForgetPass";
import SendCode from './Pages/Auth/SendCode/SendCode';
import UserContextProvider from "./context/User";
import CatagoryProducts from './Pages/Categories/CategoryProducts';
import Cart from './Pages/Cart/Cart';



export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/categories/:id",//details of the category by ID
          element: <CatagoryProducts />,
        },

        {
          path: "/product",
          element: <Products />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },

        {
          path: "/Register",
        
          element: 
         // <NProtected>
            <Register />
         // </NProtected>
          
          ,
        },
        {
          path: "/Login",
          element:
         // <NProtected>
            <Login />
         // </NProtected> ,
        },
        {
          path: "/ResetPassword",
          element: <ForgetPass />,
        },
        {
          path: "/SendCode",
          element: <SendCode />,
        },




        
      ],
    },
  ]);


  return (
   <>
<UserContextProvider>
<RouterProvider router={router} />;

</UserContextProvider>


<ToastContainer />
   </>
  )
}
