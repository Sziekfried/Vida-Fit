import {Container, Row, Col, Button, Form, Card} from "react-bootstrap";
import { Formik, Field, Form as FormFormik} from 'formik'
import {useState} from 'react'
import getClientByRfc from "../../controllers/getClientByRfc";
import {Navigate} from "react-router-dom";
import swal from "sweetalert";

//Pagina para registrar las visitas de los miembros del club partiendo de su rfc
function RegisterVisitClientPage() {
  const token = window.localStorage.getItem("token")
  let [miembro, setMiembro] = useState(null);
  let [pasa, setPasa] = useState(false)
  const verificarFechas = (fechaFin)=> {
    let fechaHoy = +new Date()
    let fechaFinSub = +new Date(fechaFin)
    
    if (fechaFinSub > fechaHoy){
      swal('Bienvenido','El cliente tiene una membresia vigente','info')
      setInterval(()=>{
        setPasa(true)
      },1000)
    }else{
      swal('Expiro', 'La membresia del cliente ha expirado', 'error')
    }
   }
  const TarjetaMiembro = () => {
    
    if(miembro){
      return (
        <Card className="text-center" style={{ maxHeight: '80vh' }}>
          <Card.Img className="mx-auto" style={{ width: 200, }}
            variant="top"
            src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666161307/hzkxoeuwiliyolv8v3gb.png"
          />
          <Card.Body>
            <Card.Title>
              {miembro.name} {miembro.lastname}
            </Card.Title>
            <Card.Subtitle>
              <h5>Nivel</h5>
              {miembro.subscription}
            </Card.Subtitle>
            <Card.Text className="mt-2">
              <h6>RFC: </h6>
              {miembro.rfc}
            </Card.Text>
            <Card.Text>
              <h6>Inicio de Suscripcion:</h6>
              {new Date(miembro.dateOfSubscription).toLocaleString().split(',')[0]}
            </Card.Text>
            <Card.Text>
              <h6>Fin de la Susripcion</h6>
              {new Date(miembro.endOfSubscription).toLocaleString().split(',')[0]}
            </Card.Text>
            <Button onClick={(ev)=>verificarFechas(miembro.endOfSubscription)} variant="primary">Registrar Visita</Button>
          </Card.Body>
        </Card>
      );
    }else {
      return(
        <h4>Ingresa el rfc para buscar al Miembro</h4>
      )
    }
  } 

  if (pasa) return <Navigate to="/home-admi" />
  return (
    <Container>
      <Row>
        <Col style={{minHeight: "min-content" }} className="text-center" sm={5}>
          <Formik
            initialValues={{
              rfc: "",
            }}
            onSubmit={async (values) => {
              let res = await getClientByRfc(values, token);
              setMiembro(res);
            }}
          >
            <Form as={FormFormik} style={{marginTop:"50%"}}>
              <Form.Label htmlFor="rfc">
                Escribe el RFC del cliente a buscar
              </Form.Label>
              <Form.Control as={Field} id="rfc" name="rfc" placeholder="RFC" />
              <Button className="mt-2" type="submit">
                Buscar Miembro
              </Button>
            </Form>
          </Formik>
        </Col>
        <Col className="text-center mt-2" sm={7}>
          <h3>{new Date().toLocaleString().split(',')[0]}</h3>
          <TarjetaMiembro />
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterVisitClientPage