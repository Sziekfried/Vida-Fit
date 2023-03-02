import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import { Container, Row, Col, Button } from "react-bootstrap";
import getEventtById from "../../controllers/getEventById";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { convertirFecha } from "../../functions/convertirFecha";
import { updateEvent } from '../../controllers/updateEvent'

function FormEditEvent() {

  // Configuraciones Iniciales
  const token = window.localStorage.getItem("token");
  let idEvent = window.location.pathname.split("/")[2];
  let [evento, setEvento] = useState(null);
  let [enviado, setEnviado] = useState(false);
  let [salir, setSalir] = useState()
  useEffect(() => {
    getEventtById(idEvent).then((data) => {
      setEvento(data);
    });
  }, []);

  //Componente Formulario
  const FormEdit = ({ evento }) => {
    //Configuracion de la Validacion
    const validacionYup = Yup.object({
      title: Yup.string("Ingresa El Nombre")
        .max(40, "Maximo 40 caracteres")
        .required("Este campo es necesario"),
      date: Yup.date("Ingresa la fecha").required("Este campo es necesario"),
      description: Yup.string("Ingresa El numero de telefono")
        .min(90, "Minimo 90 caracteres")
        .required("Este campo es necesario"),
      image: Yup.string("Ingresa El La url De La imagen"),
    });
    //Configuracion de Formik 
    const formik = useFormik({
      initialValues: {
        title: evento.title,
        date: convertirFecha(evento.date),
        description: evento.description,
        image: evento.image,
      },
      validationSchema: validacionYup,
      onSubmit: async (values) => {
        setEnviado(true);
        let seGuardo = await updateEvent(
          JSON.stringify(values, null, 2),
          evento._id,
          token
        );
        seGuardo ? setSalir(true) : setSalir(false);
      },
    });

    return ( //Retornamos el formulario COn las configuraciones establecidas
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type="text"
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion del evento</Form.Label>
          <Form.Control
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            as="textarea"
            rows={3}
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Fecha del Evento</Form.Label>
          <Form.Control
            id="date"
            name="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            type="date"
          />
          {formik.touched.date && formik.errors.date ? (
            <div>{formik.errors.date}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url de la imagen</Form.Label>
          <Form.Control
            id="image"
            name="image"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            type="text"
          />
          {formik.touched.image && formik.errors.image ? (
            <div>{formik.errors.image}</div>
          ) : null}
        </Form.Group>
        <Button disabled={false} variant="info" type="submit">
          Actualizar
        </Button>
      </Form>
    );
  };

  if(salir) return <Navigate to="/edit-events" />
  return (
    <Container>
      <Row>
        <Col sm={4}>
        {evento ? <FormEdit evento={evento} /> : <h2>cargando</h2>}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default FormEditEvent;
