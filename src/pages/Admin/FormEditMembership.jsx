import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import getMembershipById from "../../controllers/getMembershipById";
import { updateMembership } from "../../controllers/updateMembership";

function FormEditMembership() {
  // Configuraciones Iniciales
  const token = window.localStorage.getItem("token");
  let idEvent = window.location.pathname.split("/")[2];
  let [membresia, setMembresia] = useState(null);
  let [enviado, setEnviado] = useState(false);
  let [salir, setSalir] = useState();
  useEffect(() => {
    getMembershipById(idEvent).then((data) => {
      setMembresia(data);
    });
  }, []);

  //Componente Formulario
  const FormEdit = ({ membresia }) => {
    //Configuracion de la Validacion
    const validacionYup = Yup.object({
      title: Yup.string("Ingresa El Titulo para la Membresia")
        .max(40, "Maximo 40 caracteres")
        .required("Este campo es necesario"),
      level: Yup.string("Ingresa El nivel").required("Este campo es necesario"),
      description: Yup.string("Ingresa El numero de telefono")
        .min(40, "Minimo 40 caracteres")
        .required("Este campo es necesario"),
      duration: Yup.number("Ingresa la duracion en Dias").required(
        "Este campo es necesario"
      ),
      price: Yup.number(
        "Ingresa El precio en Dolares de la Membresia"
      ).required("Este campo es necesario"),
      image: Yup.string("Ingresa El La url De La imagen"),
    });
    //Configuracion de Formik
    const formik = useFormik({
      initialValues: {
        title: membresia.title,
        description: membresia.description,
        level: membresia.level,
        duration: membresia.duration,
        price: membresia.price,
        image: membresia.image,
      },
      validationSchema: validacionYup,
      onSubmit: async (values) => {
        setEnviado(true);
        let seGuardo = await updateMembership(JSON.stringify(values, null, 2),
        membresia._id,
        token);
        seGuardo ? setSalir(true) : setSalir(false);
      },
    });

    return (
      //Retornamos el formulario COn las configuraciones establecidas
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
          <Form.Label>Descripcion del membresia</Form.Label>
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
          <Form.Label>Nivel</Form.Label>
          <Form.Control
            id="level"
            name="level"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.level.toUpperCase()}
            type="text"
          />
          {formik.touched.level && formik.errors.level ? (
            <div>{formik.errors.level}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <InputGroup className="mb-3">
            <InputGroup.Text>Duracion y Precio</InputGroup.Text>
            <Form.Control aria-label="Duracion" 
            id="duration"
            name="duration"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.duration}
            type="text" />
            {formik.touched.duration && formik.errors.duration ? (
            <div>{formik.errors.duration}</div>
          ) : null}
            <Form.Control aria-label="Precio" 
            id="price"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            type="text"/>
            {formik.touched.price && formik.errors.price ? (
            <div>{formik.errors.price}</div>
          ) : null}
          </InputGroup>
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
        <Button disabled={enviado} variant="info" type="submit">
          Actualizar
        </Button>
      </Form>
    );
  };

  if (salir) return <Navigate to="/edit-membresias" />;
  return (
    <Container>
      <Row>
        <Col sm={4}>
          {membresia ? <FormEdit membresia={membresia} /> : <h2>cargando</h2>}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default FormEditMembership;
