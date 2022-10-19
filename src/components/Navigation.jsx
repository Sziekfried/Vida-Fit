import { useState } from 'react'

import {Nav, Navbar, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
function Navigation() {
  const [click, setClick] = useState(false);
  const handleclick =() => setClick(!click);
  const cerrarMenu = () => setClick(false);

  return (
    <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Vida-Fit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='justify-content-md-end' id="basic-navbar-nav">
          <Nav className="px-5">
            <Nav.Link href="#carrusel">Inicio</Nav.Link>
            <Nav.Link href="#about">Sobre Nosotros</Nav.Link>
            <Nav.Link href="#membresias">Membresias</Nav.Link>
            <Nav.Link href="#contact">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Iniciar Sesion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation