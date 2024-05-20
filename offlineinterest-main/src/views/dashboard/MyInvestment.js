import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Modal, Button } from "react-bootstrap";
import { googleSpreadSheetReadapi } from "../../authen/afterlogin";
import { number } from "yup";

const MyInvestment = () => {
  const [show, setShow] = useState(false);

  const  [apidata  , setapidata]=useState({
    listOfData1:[],
    api2:"",
    listOfData2:[],
    indexlenth:2,
  })

  const [index1 , setindex]=useState()
  const handleClose = () => setShow(false);

  useEffect(() => {
    const googleSpreadSheetReada = async () => {
      try {
        const response = await googleSpreadSheetReadapi();
        console.log(response.data);
        if(response.status == 200){
          setapidata({
            ...apidata,
            api2:response.data
          })

          console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    googleSpreadSheetReada();
    console.log("api");


    
  }, []);
  const handleShow = (index) => {
    setShow(true);
    setindex(index)
      // setapidata({
      //   ...apidata,
      //   indexlenth:apidata.listOfData2.length,
      //   listOfData1:apidata.api2[index].listOfData1,
      //   listOfData2:apidata.api2[index].listOfData2,
      // })

      setapidata((predata)=>{
        return {
          ...predata,
          indexlenth: apidata.listOfData2.length,
          listOfData1: apidata.api2[index].listOfData1,
          listOfData2: apidata.api2[index].listOfData2,
        };
      });
      
      console.log(apidata.api2[index].listOfData1);
     
      console.log(apidata.api2[index].listOfData2);
      console.log(apidata.indexlenth);
   
  }
  return (
    <React.Fragment>
      <Row>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Statement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive className="mt-4">
              <thead>
                <tr>
                  {/* <th>s#</th> */}
                  <th>MonthName</th>
                  <th>To be Paid</th>
                  <th>Paid </th>
                  <th>Paid Date</th>
                
               
                  {/* <th>Month Paid Date</th> */}
                </tr>
              </thead>
              <tbody>        {console.log(apidata)}
    

{/* {Array.isArray(apidata.listOfData2) && apidata.listOfData2.map((data, index) => (
  <React.Fragment key={index}>
    <tr> */}
      {/* <td>{index + 1}</td> */}
      {/* <td>{data.paidAmount}</td>
      <td>{data.paidDate}</td>
      <td>{data.toBePaid}</td>
      <td>{data.monthName}</td>  
      <td>{data.actualpaidDate}</td> 
    </tr>
  </React.Fragment>
))} */}

{apidata.listOfData1.length !== 0 ? (
  <>
    {Array.isArray(apidata.listOfData1) && apidata.listOfData1.map((data, index) => (
      <React.Fragment key={index}>
        <tr>
         {/* {index.length !== 0 ? <><td>{apidata.indexlenth + 1}</td></> : <></>}  */}
                <td>{data.monthName}</td> 
                <td>{data.tobePaid}</td>
            <td>{data.paid}</td>
          
          <td>{data.paidDate}</td>
         
        

          {/* <td>{data.actualpaidDate}</td>   */}

          {/* "actualpaidDate": "4,375",
        "paidDate": "4,375",
        "tobePaid": "",
        "monthName": "APR-2024",
        "paid": "" */}
        </tr>
      </React.Fragment>
    ))}
  </>
) : (
  <></>
)}

                {/* <tr>
                  <td scope="row">1</td>
                  <td>1000</td>
                  <td>paid</td>
                  <td>15/03/2024</td>
                </tr>
                <tr>
                  <td scope="row">2</td>
                  <td>100</td>
                  <td>un paid</td>
                  <td>yet to be paid</td>
                </tr> */}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table striped responsive>   
                <thead>
                  <tr>
                    <th>s#</th>
                    <th>Group</th>
                    <th>Principal</th>
                    {/* <th>ROI</th> */}
                    <th>Principal Returned</th>
                    <th>BalancePrincipal </th>
                    <th>InterestDate</th>
                    <th>InterestDate</th>
                    <th>Status</th>
                    <th>MonthlyInterest</th>
                    <th>PayoutType</th>
                    <th>Monthly statement</th>
                
                 
                    
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <td scope="row">1</td>
                    <td className="text-uppercase">livin-10l-100</td>
                    <td>100000</td>
                    <td>2%</td>
                    <td>monthly</td>
                    <td>15/03/2024</td>
                    <td>MonthlyInterest</td>
                    <td>
                      <button
                        className="btn btn-xs  bg-dark text-white"
                        onClick={handleShow}
                      >
                        statement
                      </button>
                    </td>
                  </tr> */}
                  {Array.isArray(apidata.api2) && apidata.api2.map((data, index) => (
   <React.Fragment key={index}>
    <tr>
      <td>{index + 1}</td>
      <td>{data.group}</td>
      <td>
       
        <h6 className="m-0">{data.principal}</h6>
      </td>
      {/* <td>{data.roi}%</td> */}
      <td style={{textAlign:'center'}}>{data.principalReturned !=="" ? data.principalReturned : 0}</td>
      <td className="text-center">{data.balancePrincipal}</td> 
      <td  className="text-center">{data.interestDate}</td>   
      <td>{data.typeOfTransaction}</td>  
      <td >{data.status}</td>
   
      <td className="text-center">{data.monthlyInterest}</td>
      <td >{data.payoutType}</td>
      <td>
                      <button
                        className="btn btn-xs  bg-dark text-white"
                        onClick={()=>handleShow(index)}
                      >
                        statement
                      </button>
                    </td>
     
    
    </tr>
    </React.Fragment>
))}
                  {/* <tr>
                    <td scope="row">2</td>
                    <td className="text-uppercase">sd-10l-march</td>
                    <td>1000</td>
                    <td>1.5%</td>
                    <td>Yearly</td>
                    <td>12/03/2024</td>
                    <td>
                      <button
                        className="btn btn-xs  bg-dark text-white"
                        onClick={handleShow}
                      >
                        statement
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">3</td>
                    <td className="text-uppercase">sd-3s-march-400L</td>
                    <td>200000</td>
                    <td>1.7%</td>
                    <td>monthly</td>
                    <td>31/03/2024</td>
                    <td>
                      <button
                        className="btn btn-xs bg-dark text-white"
                        onClick={handleShow}
                      >
                        statement
                      </button>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MyInvestment;
