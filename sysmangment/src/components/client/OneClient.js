import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, FormControl, ListGroup, Modal, Stack, Table } from "react-bootstrap";
import axios from "axios";
import ReactToPrint from 'react-to-print';


function OneClient(client) {
  const [show, setShow] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [sms,setSms]=useState("");
  const [showDelet, setShowDelet] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [totalPrice,setTotalPrice]=useState();
  const componentRef = useRef();
  const deleteClient = (id) => {
    axios.delete(`/client/${id}`).then(() => {
      console.log("client deleted");
    });
  };


  function totalOne(){
     
       console.log( client.priceanalyse.reduce((a,b)=>a+b,0));
      
}


function sendSMS(){
  console.log(sms);
  axios.post('/sms',{number:client.number,sms:sms}).then(response =>{
    console.log(response);
  });
}


  return (
    <Col >
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title  onClick={handleShow}  style={{ cursor: 'pointer' }} >{client.name}</Card.Title>
          <Card.Text>
            {client.number}
            <ListGroup variant="flush">
              <ListGroup.Item>
                {" "}
                <Stack direction="horizontal" gap={1} className="col-md-5 ">
                  <Button variant="success" 
                  onClick={() => {
                    setShowSMS(true);

                    }}
                  >SendSMS</Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteClient(client._id);
                      setShowDelet(true);
                      }}
                  >
                    Delete
                  </Button>
                </Stack>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
          <Modal.Title >
          </Modal.Title>
        </Modal.Header>
        <Modal.Body ref={componentRef}>
        <h2>{client.name}</h2> <span>{client.number}</span>

          <Table  striped bordered hover size="sm">
            <thead >
              <tr>
                <th>#</th>
                <th>Analyse</th>
              </tr>
            </thead>
            <tbody>
      {client.nameanalyse.map((ann, i) => (
        <tr>
      <td>{i+1}</td>
      <td>  {ann}</td>

      </tr>
      ))}

   
            </tbody>

          </Table>
              <h2>Total:{client.priceanalyse.reduce((a,b)=>a+b,0)}</h2>
        </Modal.Body>
        <Modal.Footer>
        <ReactToPrint
        trigger={() => <Button variant="success">Invoice printing</Button>}
        content={() => componentRef.current}
      />
          <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDelet}
        onHide={() => {
          setShowDelet(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete done</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDelet(false);
              window.location.reload();

            }}
          >
            ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSMS}
        onHide={() => {
          setShowSMS(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send SMS</Modal.Title>
        </Modal.Header>

        <Modal.Body >
     <Form className="d-flex">
        <FormControl
          type="text"
          placeholder="write the message"
          className="m-4 "
          aria-label="text"
          value={sms}
          onChange={(e)=>{setSms(e.target.value);
            }}
        />
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              sendSMS();
              window.location.reload();

            }}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default OneClient;
