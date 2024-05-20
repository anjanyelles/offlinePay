import PropTypes from "prop-types";
import React, { useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";

import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginapicall } from "../../../authen/afterlogin";
import { toast } from 'react-toastify';import './login1.css'
import 'react-toastify/dist/ReactToastify.css';

const FirebaseLogin = ({ className, ...rest }) => {


  const [login, setlogin] = useState({

    spreadSheetId: "1mLL8rOCJiPMOpbYlBAX_JS8jXPhCLQw-9jE18Os4xog",
    password: "",
    lenderId: "",
    error: "",
    loader:false,
  })



  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setlogin({
      ...login,
      [name]: value,
    });
  
    if (name === "lenderId") {
      const userid = value.replace(/^[^\d]*/, '');
      localStorage.setItem("lenderId", userid);
    } else if (name === "password") {
      localStorage.setItem("password", value); // Corrected from "lenderId" to "password"
    }
  }
  
  const googleSpreadSheetRead = async () => {
    console.log("Login process started");
    setlogin({
      ...login,
      loader: true
    });
    try {
      // Call the login API
      const response = await loginapicall(login);
      console.log("Login API response status:", response.status);
      console.log(response.message)
      if(response.message !== ""){
        setlogin({
          ...login,
          error: response.message,
          loader:false
        });
      }
  
      if (response.status === 200) {
        // Successful login
        // const lenderId = login.lenderId.replace(/^[^\d]*/, '');
        // localStorage.setItem("lenderId", lenderId);
        // localStorage.setItem("password", login.password);
        console.log("Login successful");
  
        if (response.data.length === 0) {
          // Handle case where no data is returned
          console.log(response)
          setlogin({
            ...login,
            error: "Incorrect password. Please try again",
            loader:false
          });
        } else {
          // Extract lender ID and navigate to dashboard
   setTimeout(() => {
    navigate("/dashboard");
   }, 2000);
         
       
        }
      }
    } catch (error) {
      // Handle any errors that occur during login process
      console.error("Error during login:", error);
      setlogin({
        ...login,
        error: "An error occurred during login. Please try again",
        loader:false
      });
    }
  
    console.log("Login state:", login);
  };
  

  return (
    <React.Fragment>


      <div className="form-group mb-3">
        <input
          className="form-control"
          label="Email Address / Username"
          placeholder="Enter LenderId"
          name="lenderId"

          onChange={handleChange}
          type="text"
          value={login.lenderId}
        />

      </div>
      <div className="form-group mb-4">
        <input
          className="form-control"
          label="Password"
          placeholder="Enter Password"
          name="password"

          onChange={handleChange}
          type="password"
          value={login.password}
        />

      </div>
      {login.error && <><div className="error" style={{ color: 'red', textAlign: 'start' }}>{login.error}</div></>}

      <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
        <input
          type="checkbox"
          className="custom-control-input"
          id="customCheck1"
        />
        <label
          className="custom-control-label mx-2"
          htmlFor="customCheck1"
        >
          Save credentials.
        </label>
      </div>


      <Row>
        <Col mt={2}>

        

          {
            login.loader ? <>  <Button
            className="btn-block"
            color="primary"

            size="large"
            type="submit"
            variant="primary"
            onClick={() => googleSpreadSheetRead()}
          >

            <div class="spinner-border text-warning"  role="status">
  <span class="visually-hidden">Loading...</span>
</div>
          </Button></> : <>  <Button
            className="btn-block"
            color="primary"

            size="large"
            type="submit"
            variant="primary"
            onClick={() => googleSpreadSheetRead()}
          >
            Signin    
          </Button></>
          }
        

        </Col>
      </Row>


      {/* 
      <Row>
        <Col sm={12}>
          <h5 className="my-3"> OR </h5>
        </Col>
      </Row> */}
      {/* 
      <Row>
        <Col sm={12}>
          <Button variant="danger">
            <i className="fa fa-lock" /> Sign in with Google
          </Button>
        </Col>
      </Row> */}

      {/* <hr /> */}
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string,
};

export default FirebaseLogin;
