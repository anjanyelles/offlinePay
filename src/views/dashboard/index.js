import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

import './dashboard.css'
import { closedAndTotaldealsCountapi, getUserAmountFromInSpreadSheetapi, getUserDetailsfromSpreadSheetapi, googleSpreadSheetReadapi } from "../../authen/afterlogin";


const DashDefault = () => {


  // const   [apidata , setapidata]=useState({
  //   api:"",
  //   api2:"",
  //   api1:"",
  //   profiledata:"",
  // })


  const [apidata, setApidata] = useState({
    api: null,
    profiledata: null,
    api1: null,
    api2: null
  });
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          closedAndTotalDealsResponse,
          userDetailsResponse,
          spreadsheetReadResponse,
          userAmountResponse
        ] = await Promise.all([
          closedAndTotaldealsCountapi(),
          getUserDetailsfromSpreadSheetapi(),
          googleSpreadSheetReadapi(),
          getUserAmountFromInSpreadSheetapi()
        ]);

        setApidata({
          api: closedAndTotalDealsResponse.data,
          profiledata: userDetailsResponse.data,
          api1: userAmountResponse.data,
          api2: spreadsheetReadResponse.data
        });
        console.log("message")
        console.log(apidata.api1[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);

        // Retry the API call after a delay, up to 3 retries
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 1000); // 1 second delay
        } else {
          setLoading(false); // Stop loading if retries are exhausted
        }
      }
    };

    fetchData();
  }, [retryCount]);


  if (loading) {
    return <div>Loading...</div>;
  }

  var inte =3;
  const dashSalesData = [
    {
      title: "Total Investment",
      amount: `${apidata.api1 && apidata.api1.length > 0 && apidata.api1[0].totalInvestment !== undefined ? apidata.api1[0].totalInvestment : ''}`,
      subtitle:`(${apidata.api.openCount})`,

      // icon: "icon-arrow-up text-c-green",
      value: 100,
      class: "progress-c-theme",
    },
    {
      title: "Current Investment",
      amount: `${apidata.api1 && apidata.api1.length > 0 && apidata.api1[0].currentInvestment !== undefined ? apidata.api1[0].currentInvestment : ''}`,

      // amount: `${(apidata.api1 !== "" && null  && undefined)  && apidata.api1[0].currentInvestment}`,
      // icon: "icon-arrow-up text-c-green",
      value: 100,
      color: "progress-c-theme",
    },
    {
      title: "Closed Investment",
      amount: `${apidata.api1 && apidata.api1.length > 0 && apidata.api1[0].closedInvestment !== undefined ? apidata.api1[0].closedInvestment : ''}`,
     
      subtitle:`(${apidata.api.closedCount})`,
      // amount: `${(apidata.api1 !== "" && null  && undefined) && apidata.api1[0].closedInvestment}`,
      // icon: "icon-arrow-down text-c-red",
      value: 100,
      color: "progress-c-themeprogress-c-theme",
    },
    {
      title: "Monthly Expected Returns",
      amount: `${apidata.api1 && apidata.api1.length > 0 && apidata.api1[0].monthlyExpertReturns !== undefined ? apidata.api1[0].monthlyExpertReturns : ''}`,
      // amount: `${(apidata.api1 !== "" && null  && undefined)  && apidata.api1[0].monthlyExpertReturns}`,
      // icon: "icon-arrow-up text-c-green",
      value: 100,
      class: "progress-c-theme2",
    },
  ];
  
  return (
    <React.Fragment>
      <div className="text d-block mb-4">
        <h3  style={{textTransform:"uppercase"}}>Welcome {apidata.profiledata  !== "" && <strong  style={{fontWeight:'600'}}>{apidata.profiledata.name}</strong>}</h3>   
        {console.log(apidata.api2[0])}
        
      </div>  

      <Row>
        {dashSalesData.map((data, index) => {
          return (
            <Col key={index} xl={3} xxl={3}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title} {data.subtitle}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} />{" "}
                        {data.amount}
                      </h3>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: "7px" }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
              
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        {/* <Col md={6} xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Monthly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> $2.942.32
                  </h3>
                </div>

                <div className="col-3 text-end">
                  <p className="m-b-0">36%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme2"
                  role="progressbar"
                  style={{ width: '35%' }}
                  aria-valuenow="35"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Yearly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $8.638.32
                  </h3>
                </div>

                <div className="col-3 text-end">
                  <p className="m-b-0">70%</p>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        <Col md={12} xl={12}>
          <Card className="user-list">
            <Card.Header>
              <Card.Title as="h5" className="text-uppercase">
                Portfolio
              </Card.Title>
              <div className="float-end">
                <Link to={"/myInvestment"}>
                  <button className="btn mx-2 btn-xs theme-bg2 text-white rounded-4">
                    View More
                  </button>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover>
                <thead>
                
                  {/* {apidata.api1 !== "" && apidata.api1.totalInvestment} */}
                  <tr>
                    <th>SO</th>
                    <th>Group </th>
                    <th>Principal</th>
                    <th>ROI</th>
                    <th>InterestDate</th>
                    <th>TypeOfTransaction</th>
                    <th>BalancePrincipal</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>

                {Array.isArray(apidata.api2) && apidata.api2.map((data, index) => (
   <React.Fragment key={index}>
    <tr>
      <td>{index + 1}</td>
      <td>{data.group}</td>
      <td>
       
        <h6 className="m-0">{data.principal}</h6>
      </td>
      <td>{data.roi}%</td>
      
      <td >{data.interestDate}</td>
      <td >{data.typeOfTransaction}</td>
      <td  className="text-start">{data.balancePrincipal}</td>  
      <td >{data.status}</td>
    </tr>
    </React.Fragment>
))}

                
                  {/* <tr>
                    <td>2</td>
                    <td>Jk-MANDEVA-2.1</td>

                    <td>
                      20999
                      <h6 className="m-0">JAN 9, 2017</h6>
                    </td>
                    <td>2%</td>
                    <td>YEARLY</td>
                  </tr> */}
                  {/* <tr>
                    <td>3</td>
                    <td>Jk-Liveen-2.3</td>

                    <td>
                      400000
                      <h6 className="m-0">March 13, 2024</h6>
                    </td>
                    <td>1.8%</td>
                    <td>HALF-YEARLY</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Jk-SD-2.1</td>

                    <td>
                      10000
                      <h6 className="m-0">April 26, 2017</h6>
                    </td>
                    <td>1.4%</td>
                    <td>YEARLY</td>
                  </tr> */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* <Col md={6} xl={8}>
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Recent Users</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover className="recent-users">
                <tbody>
                  <tr className="unread">
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar1}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Isabella Christensen</h6>
                      <p className="m-0">
                        Lorem Ipsum is simply dummy text of…
                      </p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        11 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar2}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Mathilde Andersen</h6>
                      <p className="m-0">
                        Lorem Ipsum is simply dummy text of…
                      </p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        11 MAY 10:35
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar3}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Karla Sorensen</h6>
                      <p className="m-0">
                        Lorem Ipsum is simply dummy text of…
                      </p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />9
                        MAY 17:38
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar1}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Ida Jorgensen</h6>
                      <p className="m-0">
                        Lorem Ipsum is simply dummy text of…
                      </p>
                    </td>
                    <td>
                      <h6 className="text-muted f-w-300">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        19 MAY 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                  <tr className="unread">
                    <td>
                      <img
                        className="rounded-circle"
                        style={{ width: "40px" }}
                        src={avatar2}
                        alt="activity-user"
                      />
                    </td>
                    <td>
                      <h6 className="mb-1">Albert Andersen</h6>
                      <p className="m-0">
                        Lorem Ipsum is simply dummy text of…
                      </p>
                    </td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        21 July 12:56
                      </h6>
                    </td>
                    <td>
                      <Link to="#" className="label theme-bg2 text-white f-12">
                        Reject
                      </Link>
                      <Link to="#" className="label theme-bg text-white f-12">
                        Approve
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}
        <Col md={6} xl={4}>
          {/* <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Next Interest</h5>
                </div>
                <div className="col-auto">
                  <label className="label theme-bg2 text-white f-14 f-w-400 float-end">
                    2000
                  </label>
                </div>
              </div>

              <Carousel
                data-bs-theme="dark"
                slide={true}
                controls={true}
                variant="dark"
                className="mt-3"
              >
                <Carousel.Item interval={1000}>
                  <img
                    className="d-block w-100"
                    src="https://wallpapercave.com/wp/wp2561064.jpg"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <p>Jk-RAM-2.1</p>
                    <h4 className="">INR 1000</h4>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={700}>
                  <img
                    className="d-block w-100"
                    src="https://wallpapercave.com/wp/wp2561064.jpg"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <p>Jk-MANDEVA-2.1</p>
                    <h4 className="">INR 500</h4>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={700}>
                  <img
                    className="d-block w-100 h-25"
                    src="https://wallpapercave.com/wp/wp2561064.jpg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <p>Jk-Liveen-2.3</p>
                    <h4 className="">INR 500</h4>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel> */}

              {/* <h4 className="mt-2 f-w-300">15/03/2024</h4>
              <h6 className="text-muted mt-3 mb-0">You can receive on date</h6>
              <i className="fa fa-angellist text-c-purple f-50" /> */}
            {/* </Card.Body>
          </Card> */}
          {/* <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">{apidata.api.openCount}</h3>
                  <span className="d-block text-uppercase">Total Deals Count</span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">{apidata.api.closedCount}</h3>
                  <span className="d-block text-uppercase"> */}
                    {/* Open  */}
                    {/* Closed Deals Count</span>
                </div>
              </div>
            </Card.Body>
          </Card> */}
        </Col>
        {/* <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-facebook-f text-primary f-36" />
                </div>
                <div className="col text-end">
                  <h3>12,281</h3>
                  <h5 className="text-c-green mb-0">
                    +7.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>35,098
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "60%", height: "6px" }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>350
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: "45%", height: "6px" }}
                      aria-valuenow="45"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-twitter text-c-blue f-36" />
                </div>
                <div className="col text-end">
                  <h3>11,200</h3>
                  <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: "40%", height: "6px" }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: "70%", height: "6px" }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fab fa-google-plus-g text-c-red f-36" />
                </div>
                <div className="col text-end">
                  <h3>10,500</h3>
                  <h5 className="text-c-blue mb-0">
                    +5.9% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>25,998
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "80%", height: "6px" }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>900
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: "50%", height: "6px" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h2 className="f-w-300 d-flex align-items-center float-start m-0">
                    4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h2>
                </div>
                <div className="col-6">
                  <h6 className="d-flex  align-items-center float-end m-0">
                    0.4{" "}
                    <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h6>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-end">384</h6>
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-end">145</h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "35%" }}
                      aria-valuenow="35"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-end">24</h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "25%" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-end">1</h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: "10%" }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-start">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-end">0</h6>
                  <div
                    className="progress m-t-30  m-b-5"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "0%" }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
