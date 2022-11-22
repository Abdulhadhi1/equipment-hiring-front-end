import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { env } from './config';
import UserContext from './contect';
import loads from '../load.svg'
import './css/Login.css';


function Login() {
  let navigate = useNavigate();
  let [loading,setloading] = useState(false);
  let context = useContext(UserContext);
  const { getUserdata, getData } = context;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.email.length === 0) {
        errors.email = "Required"
      }
      if (values.password.length === 0) {
        errors.password = "Required"
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        setloading(true)
        let user = await axios.post(`${env.api}/login`, values);
        console.log(user);
        if (user.data.statusCode === 201) {
          window.localStorage.setItem("Token", user.data.token)
          setloading(false)
          toast.success(user.data.message)
          getData()
          getUserdata(user.data.user.name, user.data.user.email, user.data.user.roll)
          setTimeout(() => {
            navigate("/layout");
          }, 1000)

        }

        if (user.data.statusCode === 401) {
          toast.warn(user.data.message)
        }
      } catch (error) {
        console.log(error);
      }

    }
  });
  return (
    <>
    <h1 style={{textAlign:"center"}}>Equipment Hiring</h1>
      <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh",  }} >
        <form style={{
          minWidth: "30px",
          margin: "0 auto",
          backgroundColor:"grey",
          height:"450px",
          width:"500px"
          
        }} onSubmit={(values) => {
          formik.handleSubmit(values)
        }}>
          <h4 className='text-center mb-4 'style={{ 
              
               top:"30px",
               position:"relative"
            
            
               }} >Login Page</h4><br></br><br></br>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" style={{ 
              
             position:"relative",
             left: "100px",
           
           
              }}>UserName</label>
            <input type="email" className="form-control shadow-none" id="exampleInputEmail1" placeholder='Enter your Email Id' value={formik.values.email }
              onChange={formik.handleChange}
              name="email" style={{ background:"white",position:"relative",
              
              left: "100px",
              width: "300px",
           
             }}/>
            <div style={{ color: "red", textAlign: "end" }}> {formik.errors.email}</div>

          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label " style={{ 
              
              position:"relative",
              left: "100px",
            
            
               }}>Password</label>
            <input type="password" className="form-control shadow-none" id="exampleInputPassword1" placeholder='Enter you Password' value={formik.values.password}
              onChange={formik.handleChange}
              name="password" style={{ background:"white",position:"relative",
              
              left: "100px",
              width: "300px",
           
           }} />
            <div style={{ color: "red", textAlign: "center" }}> {formik.errors.password}</div>
          </div>
          <div className="mb-3 " style={{
            color: "black",
            textAlign: "center",
            cursor: "pointer",

          }}>
            <span className='underline' onClick={() => navigate("forgot-password")}>Forgot Password</span>
          </div>


          <button type="submit" className="btn123" disabled={!formik.isValid}>Login</button> {loading ? <img src={loads} alt="load" style={{width:"3rem",paddingLeft:"5px",}} />: null}
          <div className="mt-3 " style={{
            color: "black",
            textAlign: "center",
            cursor: "pointer",

          }} >
            <span className='underline' onClick={() => navigate("/register")}> Create New User</span>
          </div>
          <div className='mt-5'>
  
</div>

        </form>
        <ToastContainer />


      </div>

    </>
  )
}

export default Login