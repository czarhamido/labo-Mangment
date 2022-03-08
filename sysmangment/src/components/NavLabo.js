import React from "react";
import './NavLabo.css';
import { Container, Nav, Navbar } from "react-bootstrap";
import {Link} from 'react-router-dom';
function NavLabo() {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" >
            Labo Mangment
          </Navbar.Brand>
          <Nav className="d-flex">
        <Nav >
          <Link id="RouterNavLink" to='/' style={{ textDecoration: 'none' ,color:"#FFF",marginRight:12}}>Home</Link>
        </Nav>

        <Nav >
          <Link  id="RouterNavLink" to='/analyse' style={{ textDecoration: 'none' ,color:"#FFF" }}>Analyse</Link>
        </Nav>
    
        </Nav>
        </Container>
      
      </Navbar>
    </>
  );
}

export default NavLabo;
