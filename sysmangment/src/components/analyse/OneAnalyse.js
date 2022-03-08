import React from "react";
import { Button, Card, Col, ListGroup, Modal, Stack } from "react-bootstrap";
import axios from 'axios';



const deleteAnalyse=(id)=>{
  axios.delete(`/analyse/${id}`)
  .then(()=>{
    console.log("Analyse deleted");
  })
}
function OneAnalyse(analyse) {
  return (
    <Col>
      <Card style={{ width: "18rem" }} >
        <Card.Body>
          <Card.Title>{analyse.name}</Card.Title>
          <Card.Text>
            {analyse.price}
            <ListGroup variant="flush">
              <ListGroup.Item>
                {" "}
                <Stack direction="horizontal" gap={1} className="col-md-5 ">
                  <Button variant="danger"  onClick={()=>{deleteAnalyse(analyse._id); window.location.reload();}} >Delete</Button>
                </Stack>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default OneAnalyse;
