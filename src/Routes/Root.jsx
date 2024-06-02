
import Footer from '../Components/Footer/Footer';
import Navbar from './../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Root.css'



export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
