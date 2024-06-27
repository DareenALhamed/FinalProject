// import "./Footer.css"

// export default function Footer() {
//   return (
//     <>
//     <footer>
//   <div className="jumbotron jumbotron-fluid bg-secondary p-4 mt-5 mb-0">
//     <div className="container">
//       <div className="row">
//         <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 cizgi">
//           <div className="card bg-secondary border-0">
//             <div className="card-body text-light text-center">
             
//               <p className="d-inline lead">All Rights Reserved © 2024<br />
               
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 cizgi">
//           <div className="card bg-secondary border-0">
//             <div className="card-body text-center">
//               <h5 className=" text-white display-4  m " style={{fontSize: 30}}>Contact Us</h5>
//               <a className="text-light d-block lead  m-4 p-1" href="#"><i className="fa fa-phone mr-2" />+972 592 123 456</a>
//               <a className="text-light d-block lead " href="#"><i className="fa fa-envelope mr-2" />Target@gmail.com</a>
//             </div>
//           </div>
//         </div>
//         <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
//           <div className="card bg-secondary border-0">
//             <div className="card-body text-center">
//               <h5 className="card-title text-white display-4" style={{fontSize: 30}}>Social Media</h5>
//               <a className="text-light" href="#"></a>
//               <a className="text-light" href="#"><i className="fa fa-twitter-square fa-fw fa-2x" /></a>
//               <a className="text-light" href="#"><i className="fa fa-instagram fa-fw fa-2x" /></a>
//               <a className="text-light" href="#"><i className="fa fa-linkedin fa-fw fa-2x" /></a>
//             </div>
//           </div>
//         </div>	
//       </div>
//     </div>
//   </div>
// </footer>

    
    
//     </>
//   )
// }

import React from 'react'

export default function Footer() {
  return (
    <>
    
<div className=" my-5">
  <footer className="text-center text-white" style={{backgroundColor: '#868686'}}>
    <div className="container">
      <section className="mt-5">
        <div className="row text-center d-flex justify-content-center pt-5">
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">About us</a>
            </h6>
          </div>
          
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Products</a>
            </h6>
          </div>
         
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Help</a>
            </h6>
          </div>
          
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">Contact</a>
            </h6>
          </div>
          
        </div>
       
      </section>
      
      <hr className="my-5" />
     
      <section >
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <p className="p-4 rounded border border-danger text-danger font-weight-bold font-italic" style={{backgroundColor: '#fff'}}>
             Feel Free To Contact US.
            </p>
          </div>
        </div>
      </section>
      
      <section className="text-center mb-5">
        <a href className="text-white me-4">
          <i className="fab fa-facebook-f" />
        </a>
        <a href className="text-white me-4">
          <i className="fab fa-twitter" />
        </a>
        <a href className="text-white me-4">
          <i className="fab fa-google" />
        </a>
        <a href className="text-white me-4">
          <i className="fab fa-instagram" />
        </a>
        <a href className="text-white me-4">
          <i className="fab fa-linkedin" />
        </a>
        <a href className="text-white me-4">
          <i className="fab fa-github" />
        </a>
      </section>
     
    </div>
    {/* Grid container */}
    {/* Copyright */}
    <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
      © 2024 Copyright:
    </div>
    {/* Copyright */}
  </footer>
  {/* Footer */}
</div>
{/* End of .container */}

    </>
  )
}

