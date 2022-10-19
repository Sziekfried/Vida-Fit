import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function NavGerente() {
  return (
    <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Vida-Fit
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-md-end"
          id="basic-navbar-nav"
        >
          <Nav className="px-5">
            <Nav.Link as={NavLink} to="/home-admi">
              Inicio
            </Nav.Link>

          <NavDropdown title="Clientes" id="basic-nav-home">
            <NavDropdown.Item as={NavLink} to="/clientes">
              Clientes
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/visita-cliente">
              Registrar Visita
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/new-client">
              Nuevo Cliente
            </NavDropdown.Item>
          </NavDropdown>
            <NavDropdown title="Opciones">
            <NavDropdown.Item as={NavLink} to="/edit-events">
                Editar Eventos
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/edit-membresias">
                Editar Membresias
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/logout">Salir</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavGerente;
