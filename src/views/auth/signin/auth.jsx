import PropTypes from "prop-types";
import React, { useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";

import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginapicall } from "../../../authen/afterlogin";

const FirebaseLogin = ({ className, ...rest }) => {


  const [login , setlogin]=useState({

    spreadSheetId:"1NEp7phX60w0jByET9qbfZKCwIJJTOuD_lytI_jrnhvw",
    range:"DATA",
    password:"Vijay@123",
    lenderId1:1
  })


  const navigate = useNavigate();
    const googleSpreadSheetReada = async () => {
      try {
        const response = await loginapicall(login);
        console.log(response.data);
        if(response.status == 200){
          // setapidata({
          //   ...apidata,
          //   api2:response.data
          // })

          console.log(response.data)
          navigate("/dashboard") 
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          lenderId1: "1",
          password: "123456",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className={className}
            {...rest}
          >
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && (
                <small className="text-danger form-text">{errors.email}</small>
              )}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && (
                <small className="text-danger form-text">
                  {errors.password}
                </small>
              )}
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

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
                <Link to="dashboard">
                  <Button
                    className="btn-block"
                    color="primary"
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="primary"
                    onClick={()=>googleSpreadSheetReada()}
                  >
                    Signin
                  </Button>
                </Link>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
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
