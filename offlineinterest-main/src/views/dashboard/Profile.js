import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Pagination } from "react-bootstrap";
import ModuleNotification from "../../components/Widgets/Statistic/Notification";

import Card from "../../components/Card/MainCard";
import { getUserDetailsfromSpreadSheetapi } from "../../authen/afterlogin";

const Profile = () => {



  const [apidata , setapidata]=useState({
    profiledata:"",

  })
  useEffect(() => {
    const handlegetUserDetailsfromSpreadSheetapi = async () => {
      try {
        const response = await getUserDetailsfromSpreadSheetapi();
        console.log(response.data);
        if(response.status == 200){
          setapidata({
            ...apidata,
            profiledata:response.data
          })

          // console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    handlegetUserDetailsfromSpreadSheetapi();
    console.log("api");
  }, []);
  
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card title="Personal Info">
            <Breadcrumb>
              <Breadcrumb.Item href="#" active>
                {" "}
                {apidata.profiledata  !== "" && <>{apidata.profiledata.name}</>}
              </Breadcrumb.Item>
            </Breadcrumb>
            {/* <Breadcrumb>
              <Breadcrumb.Item href="#">                {apidata.profiledata  !== "" && <>{apidata.profiledata.email}</>}</Breadcrumb.Item>
            </Breadcrumb>
            <Breadcrumb>
              <Breadcrumb.Item href="#">                {apidata.profiledata  !== "" && <>{apidata.profiledata.}</>}</Breadcrumb.Item>
            </Breadcrumb> */} 
          </Card>
        </Col>
        <Col md={6}>
          <Card title="Bank Account Details">
            <Breadcrumb>
              <Breadcrumb.Item href="#" active>
              {apidata.profiledata  !== "" && <>{apidata.profiledata.bankName}</>}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Breadcrumb>
              <Breadcrumb.Item href="#">       {apidata.profiledata  !== "" && <>{apidata.profiledata.bankAccountNumber}</>}</Breadcrumb.Item>
            </Breadcrumb>
            <Breadcrumb>
              <Breadcrumb.Item href="#"> {apidata.profiledata  !== "" && <>{apidata.profiledata.bankIfsc}</>}</Breadcrumb.Item>
            </Breadcrumb>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Profile;
