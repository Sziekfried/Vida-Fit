import { useEffect, useState } from "react";
import {Container, Row, Col, ListGroup, Card} from "react-bootstrap";
import getClientByRfc from '../../controllers/getClientByRfc'
import { updateClient } from "../../controllers/updateClient";
import UpdateClientForm from "../../components/UpdateClientForm";



function EditClient() {
  let token = window.localStorage.getItem("token");
  let rfc = window.location.pathname.split("/")[2];
  let [miembro, setMiembro] = useState();
  useEffect(() => {
    getClientByRfc(rfc, token).then((data) => {
      setMiembro(data);
    });
  }, []);

  return (
    <Container>
      <Row className="mt-3 mb-2">
        <Col sm={6}>
          {miembro ? <UpdateClientForm miembro={miembro} /> : <h2>cargando</h2>}
        </Col>
        <Col>
          {miembro ? 
          <>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666117414/nyqvcevbzopafmt9lil3.png" />
            <Card.Body>
              <Card.Title>{miembro.name}</Card.Title>
              <Card.Text>
                {miembro.lastname}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Nivel: {miembro.subscription}</ListGroup.Item>
              <ListGroup.Item>Fecha Inicio: {new Date(miembro.dateOfSubscription).toLocaleString()}</ListGroup.Item>
              <ListGroup.Item>fecha Fin: {new Date(miembro.endOfSubscription).toLocaleString()}</ListGroup.Item>
            </ListGroup>
          </Card>
          </>
          : <h2>cargando</h2>}
        </Col>
      </Row>
    </Container>
  );
}

export default EditClient