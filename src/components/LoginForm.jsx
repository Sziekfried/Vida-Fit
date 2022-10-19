import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import {GerentContext} from '../context/Gerente/GerentContext';
import {useContext, useState} from 'react'
import {Navigate} from 'react-router-dom'


function LoginForm() {
  const {loginGerente, id} = useContext(GerentContext)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "deben ser mas de 8 caracteres")
        .required("Required"),
    }),
    onSubmit: (values) => {
      loginGerente(JSON.stringify(values, null, 2));
    },
  });

  if (id) return <Navigate to="/home-admi"  />
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Direccion de Correo</Form.Label>
        <Form.Control
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          Esta informacion no se comparte con nadie mas
        </Form.Text>
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </Form.Group>
      <Button variant="primary" type="submit">
        Ingresar
      </Button>
    </Form>
  );
}

export default LoginForm;
