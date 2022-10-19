import { useState, useEffect } from 'react'
import {useFormik} from 'formik';
import {Container, Col, Row, Button, Form, Card } from "react-bootstrap";
import * as Yup from "yup";
import { agregarCliente } from '../../controllers/addClient';
import { getMembresias } from '../../controllers/getMembresias';
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';

function SubscribeClientPage() {
  //calculos con las fechas
  let hoy = new Date();
  let txtHoy = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
  let [fecha, setFecha] = useState(txtHoy)
  const cambiarFecha = (fechaI, dias) => {
      let fechaInicial = new Date(fechaI)
      let fechaFinal = new Date(+fechaInicial + (dias*1000*60*60*24))
      let stringFecha = `${fechaFinal.getFullYear()}-${((fechaFinal.getMonth()+1)<10) ? '0'+ (fechaFinal.getMonth()+1) : fechaFinal.getMonth()+1 }-${(fechaFinal.getDate()<10) ? '0'+fechaFinal.getDate():fechaFinal.getDate()}`
      setFecha(stringFecha)
  }
  let [dias, setDias] = useState(0);

  let [enviado, setEnviado] = useState(false)

//obtener todas las membresias
let [membresias, setMembresias] =useState(null);
useEffect(() => {
  getMembresias().then((data) => {
  setMembresias(data);
  });
}, []);
const obtenerDias = (membresia) => {
  let diass = 0;
  membresias.forEach(item => {
    if (item.level.toUpperCase()===membresia){
      diass = item.duration;
    }
  });
  return diass;
}
//configuracion del formulario
const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      rfc: '',
      phone: '',
      subscription: '',
      dateOfSubscription: txtHoy
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, 'Menos de 15 Caracteres').required(),
      lastname: Yup.string().max(30, 'Menos de 30 Caracteres').required(),
      rfc: Yup.string().min(13, "RFC incorrecto").required(),
      phone: Yup.number().min(10, "Telefono incorrecto").required(),
      subscription: Yup.string().required(),
      dateOfSubscription: Yup.date()
    }),
    onSubmit: (values) => {
      const valuesForm = values;
      const endSub = {endOfSubscription:fecha}
      const bodyClient = JSON.stringify(Object.assign(valuesForm,endSub))
      agregarCliente(bodyClient).then(res=>{
        if (!(res.response)){
          setEnviado(true)
          console.log(res.response);
        }else{
          console.log(res.response);
        }
      });
    },
  });


  const ListaMembresias = () => {
    if (membresias)
      return (
        <Form.Select
          id="subscription"
          onChange={(ev)=>{
            formik.handleChange(ev);
            setDias(obtenerDias(ev.target.value))
            cambiarFecha(txtHoy,obtenerDias(ev.target.value));
            }
          }
          onBlur={formik.handleBlur}
          value={formik.values.subscription}
        >
          <option>Selecciona Una Opcion</option>
          {membresias.map((item, index) => {
            return <option key={index}>{item.level.toUpperCase()}</option>;
          })}
        </Form.Select>
      );
    else
      return (
        <Form.Select
          id="subscription"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subscription}
        >
          <option>argando Opciones</option>
        </Form.Select>
      );
  };
  const TarjMembresias = () => {
    if (membresias) {
      return (
        <Row xs={1} md={2} className="g-4 text-center">
          {membresias.map((item, idx) => (
            <Col key={idx}>
              <Card className='p-2 h-100'>
                <Card.Img style={{margin:"auto",width:100}} variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Nivel de Membresia: {item.level.toUpperCase()}</Card.Text>
                  <Card.Text>Dias de duracion: {item.duration}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    } else {
      return (
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card>
              <Card.Img variant="top" />
              <Card.Body>
                <Card.Title>Cargando</Card.Title>
                <Card.Text>Cargando Membresias</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }
  };
  if(enviado){
    return(
      <Navigate to="/clientes" />
    )
  }else return (
    <Container>
      <Row className="mx-auto mt-3">
        <Col sm={7}>
          <Form onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  id="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  type="text"
                  placeholder="Nombre(s) del cliente"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  id="lastname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  type="text"
                  placeholder="Apellidos"
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div>{formik.errors.lastname}</div>
                ) : null}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>RFC</Form.Label>
              <Form.Control
                id="rfc"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rfc.toUpperCase()}
                placeholder="RFC del cliente"
              />
              {formik.touched.rfc && formik.errors.rfc ? (
                <div>{formik.errors.rfc}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                id="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                placeholder="10 digitos del telefono"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div>{formik.errors.phone}</div>
              ) : null}
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Membresia</Form.Label>
                <ListaMembresias />
                {formik.touched.subscription && formik.errors.subscription ? (
                  <div>{formik.errors.subscription}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control
                  id="dateOfSubscription"
                  onBlur={formik.handleBlur}
                  type="date"
                  defaultValue={txtHoy}
                  onChange={(ev) => {
                    formik.handleChange(ev);
                    cambiarFecha(ev.target.value, dias);
                  }}
                />
                {formik.touched.dateOfSubscription && formik.errors.dateOfSubscription ? (
                  <div>{formik.errors.dateOfSubscription}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control
                  type="date"
                  disabled
                  readOnly
                  value={fecha}
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Suscribir
            </Button>
          </Form>
        </Col>
        <Col sm={5}>
          <TarjMembresias />
        </Col>
      </Row>
    </Container>
  );
}

export default SubscribeClientPage