import React ,{useState,useEffect} from "react";
import OneAnalyse from "./OneAnalyse";
import {analyse } from "../../data/data";
import { Button, Container, Form, FormControl, Modal, Row } from "react-bootstrap";
import axios from 'axios';

function TableAnalyse() {
  const [show, setShow] = useState(false);
  const [dataAnalyse,setDataAnalyse]=useState([]);
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [q,setQ]=useState("");

  useEffect(()=> {
    axios.get('/analyse')
    .then(res => {
      setDataAnalyse(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const newAn={
    name:name,
    price:price,
  }
  const creatAnalyse=()=>{
    axios.post('/analyse',newAn)
    .then(response =>{
      setDataAnalyse([...dataAnalyse,response.data]);

    });
  }

  function search(rows){
    return rows.filter((row)=>row.name.indexOf(q)> -1);
  }

  return (
    <div>
      <h1>Our Analyses </h1>
      <Button onClick={handleShow}>Add New Analyse</Button>
      <Container>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="m-4 "
            aria-label="Search"
            value={q}
            onChange={(e)=> setQ(e.target.value)}
          />
        </Form>
      </Container>
      <Container className="d-flex justify-content-center">
        <Row xs={1} md={search(dataAnalyse).length >3 ? 4:search(dataAnalyse).length >2 ? 3:2} className="g-4">
          {search(dataAnalyse).map((analy) => (
            <>
              <OneAnalyse {...analy} />
            </>
          ))}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Analyse</Modal.Title>
          </Modal.Header>
          <Modal.Body >
     <Form className="d-flex">
        <FormControl
          type="text"
          placeholder="Name"
          className="m-4 "
          aria-label="text"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
            <FormControl
          type="text"
          placeholder="Price"
          className="m-4 "
          aria-label="number"
          value={price}
          onChange={(e)=>{setPrice(e.target.value)}}
        />
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{
              creatAnalyse(); 
              setName("");
              setPrice("");
              handleClose(); 



            }}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default TableAnalyse;
