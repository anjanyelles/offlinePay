import React, { useEffect, useState } from "react";
import { ListGroup, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
// import PerfectScrollbar from "react-perfect-scrollbar";

import avatar1 from "../../../../assets/images/user/avatar-1.jpg";
import { getUserDetailsfromSpreadSheetapi } from "../../../../authen/afterlogin";
// import avatar2 from "../../../../assets/images/user/avatar-2.jpg";
// import avatar3 from "../../../../assets/images/user/avatar-3.jpg";
// import avatar4 from "../../../../assets/images/user/avatar-4.jpg";

const NavRight = () => {
  

  const [apiData, setApiData] = useState({ profiledata: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlegetUserDetailsfromSpreadSheetapi = async () => {
      try {
        const response = await getUserDetailsfromSpreadSheetapi();
        console.log(response.data);
        if (response.status === 200) {
          setApiData((prevData) => ({
            ...prevData,
            profiledata: response.data
          }));
          setIsLoading(!isLoading)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after response or error
      }
    };
  
    handlegetUserDetailsfromSpreadSheetapi();
    console.log("API call initiated");
  }, []);

  
  return (   
    <React.Fragment>
        {isLoading ? (
        <p>Loading...</p>
      ) : (
      <ListGroup
        as="ul"
        bsPrefix=" "
        className="navbar-nav ml-auto"
        id="navbar-right"
      >
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start" className="drp-user">
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              id="dropdown-basic"
            >
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{apiData.profiledata.name  !== "" ? <>{apiData.profiledata.name}</> : <></>}</span>
                {/* <span>livin Mandeva</span> */}
                <Link to="/" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup
                as="ul"
                bsPrefix=" "
                variant="flush"
                className="pro-body"
              >
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/profile" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>

                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/myInvestment" className="dropdown-item">
                    <FiUserCheck className="feather"></FiUserCheck>
                    <span className="mx-3">My Portfolio</span>
                  </Link>
                </ListGroup.Item>

                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/" className="dropdown-item" onClick={() => localStorage.clear()}>
                    <i className="feather icon-log-out" /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      ) }
      {/* <ChatList listOpen={listOpen} closed={() => setListOpen(false)} /> */}
    </React.Fragment>
  );
};

export default NavRight;
