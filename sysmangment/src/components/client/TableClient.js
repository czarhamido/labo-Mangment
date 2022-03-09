import React,{useState,useEffect} from "react";
import OneClient from "./OneClient";
import './TableClient.css';
import { Button, Container, Form, FormControl, Modal, Row } from "react-bootstrap";
import axios from 'axios';

function TableClient() {
    const [show, setShow] = useState(false);
    const [dataClient,setDataClient]=useState([]);
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [dataAnalyse,setDataAnalyse]=useState([]);
    const[nameanalyse,setNameAnalyse]=useState([]);
    const [priceAnalyse,setPriceAnalyse]=useState([]);
    const [totalPrice,setTotalPrice]=useState([]);
    const [totalP,setTotalP]=useState(0);
    const [q,setQ]=useState("");
    const handleClose = () =>{setShow(false);console.log(nameanalyse);} ;
    const handleShow = () => setShow(true);
    const LoadData=async ()=>{
    await  axios.get('/client')
      .then(res => {
        localStorage.setItem('client',JSON.stringify(res.data));
        setDataClient( JSON.parse(localStorage.getItem('client')));
        total();

      })
      .catch(err => {
        console.log(err);
      })
    };
    useEffect(()=> {
      LoadData()
      axios.get('/analyse')
      .then(res => {
        setDataAnalyse(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      


    },[])
    const newCl={
      name:name,
      number:number,
      nameanalyse:nameanalyse,
      priceanalyse:priceAnalyse,
    }
    const creatClient=()=>{
      axios.post('/client',newCl)
      .then(response =>{
        setDataClient([...dataClient,response.data]);
        console.log(dataClient);
      });
    }



    const handlChackedAnalyse =(event)=>{
      var UpdatedList=[...nameanalyse];
      var UpdatedListPrice=[...priceAnalyse];
      if(event.target.checked){
        UpdatedList=[...nameanalyse,event.target.getAttribute("value1")];
        UpdatedListPrice=[...priceAnalyse,event.target.getAttribute("value2")];

      }else {
        UpdatedList.splice(nameanalyse.indexOf(event.target.getAttribute("value1")),1);
        UpdatedListPrice.splice(priceAnalyse.indexOf(event.target.getAttribute("value2")),1);

      }
      setNameAnalyse(UpdatedList);
      setPriceAnalyse(UpdatedListPrice);
    }


    function total(){
     
        setTotalPrice([]);
        console.log(dataClient);        
        JSON.parse(localStorage.getItem('client')).map(function(clientP,j){
     clientP.priceanalyse.map(function(cli,i){
    
              totalPrice.push(cli)                 
              
            })
            
      
            })
           console.log(totalPrice.reduce((a,b)=>a+b,0));
           setTotalP(totalPrice.reduce((a,b)=>a+b,0))
          
    }
function search(rows){
  return rows.filter((row)=>row.name.indexOf(q)> -1);
}

  return (
    <div>
      <h1>Our Coustumer today</h1>
      <div className="d-flex justify-content-center Total">
        Total:{totalP}
      </div>
      <Button onClick={handleShow}>Add New Coustumer</Button>

      <Container>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search by name"
          className="m-4 "
          aria-label="Search"
          value={q}
          onChange={(e)=> setQ(e.target.value)}
        />
      </Form>
      </Container>
      <Container className="d-flex justify-content-center">

      <Row xs={1} md={search(dataClient).length >3 ? 4:search(dataClient).length >2 ? 3:2} className="g-4">
        {search(dataClient).length > 0 ? search(dataClient).map((client,i) => (
          <div > 
            <OneClient    {...client} />
          </div>
        )): <h1>There is no such name</h1> }
       
  
      </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Coustumer</Modal.Title>
          </Modal.Header>
          <Modal.Body >
     <Form className="d-flex">
        <FormControl
          type="text"
          placeholder="Full Name"
          className="m-4 "
          aria-label="text"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
            <FormControl
          type="number"
          placeholder="Number phone"
          className="m-4 "
          aria-label="number"
          value={number}
          onChange={(e)=>{setNumber(e.target.value)}}
        />
      </Form>
      <Form >
          {dataAnalyse.map((an)=>(
              <Form.Check  
              type="checkbox"
              label={an.name +"="+ an.price}
              value=""
              value1={an.name}
              value2={an.price}
              onChange={handlChackedAnalyse}
              />
          ))}
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" 
            onClick={()=>{
              creatClient(); 
              setName("");
              setNumber("");
              setNameAnalyse([]);
              setPriceAnalyse([]);
              handleClose(); 
              window.location.reload();


            }}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>

        
     
    
        
    </div>
  );
}

export default TableClient;
