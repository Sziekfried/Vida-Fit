import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { convertirFecha } from "../functions/convertirFecha";
import { getMembresias } from "../controllers/getMembresias";
import { useState, useEffect } from "react";
import { updateClient } from "../controllers/updateClient";


/**
 * 
 * @param {Object} param0 Requiere que se le herede todo el registro que se va a editar para mostrarse en el formulario inicial
 * @returns Componente de formulario para haer las ediciones en el registro 
 */
function UpdateClientForm({ miembro }) {
let token = window.localStorage.getItem("token")
let [membresias, setMembresias] = useState(null);
let [fechaInicio, setFechaInicio] = useState(+new Date(miembro.dateOfSubscription));
let [fechaFin, setFechaFin] = useState('2022-10-20');
let [nuevaMembresia, setNuevaMembresia ] = useState(miembro.subscription)
let [enviado, setEnviado] = useState(false)

useEffect(() => {
    getMembresias().then((data) => {
      setMembresias(data);
    });
  }, []);

  function OptionsMembresia() {
    if (membresias) {
      return (
        <>
          {membresias.map((item, index) => {
            return <option key={index}>{item.level.toUpperCase()}</option>;
          })}
        </>
      );
    }
  }
/**
 * 
 * @param {String} memb Membresia elegida
 * @returns {Number} retorna un Numero correspondiente a los dias de la membresia
 */
  function obtenerDias(memb){
    let dias = 0;
    membresias.forEach(item=>{
        if(item.level.toUpperCase()===memb){
            dias= item.duration
        }
    })
    return dias
  }





/**
 * Se hace uso de la libreria Yup en conjunto con Formik para hacer las validaciones en el formulario
 */
  const validacionYup = Yup.object({
    name: Yup.string("Ingresa El Nombre")
      .max(15, "Maximo 15 caracteres")
      .required("Este campo es necesario"),
    lastname: Yup.string("Ingresa Los apellidos")
      .max(30, "Maximo 30 caracteres")
      .required("Este campo es necesario"),
    phone: Yup.number("Ingresa El numero de telefono")
      .max(9999999999, "Maximo 10 caracteres")
      .min(1000000000, "numero invalido"),
    rfc: Yup.string("Ingresa El RFC")
      .max(14, "Maximo 15 caracteres")
      .min(13, "deben ser 13 caracteres")
      .required("Este campo es necesario"),
    subscription: Yup.string("Ingresa la suscripcion")
      .required("Este campo es necesario"),
    dateOfSubscription: Yup.date(
      "Ingresa la fecha de inicio de la suscripcion"
    )
  });

  const formik = useFormik({
    initialValues: {
      name: miembro.name,
      lastname: miembro.lastname,
      phone: miembro.phone,
      rfc: miembro.rfc,
      subscription: miembro.subscription,
      dateOfSubscription: convertirFecha(miembro.dateOfSubscription),
    },
    validationSchema: validacionYup,
    onSubmit: (values) => {
        const valuesForm = values;
        const endSub = {endOfSubscription:fechaFin}
        const bodyClient = JSON.stringify(Object.assign(valuesForm,endSub))
        updateClient(bodyClient,token,miembro._id).then(res=>{
            if(res.status ===200){
                setEnviado(true)
            }else{
                alert('algo Salio Mal')
            }
      })
    },
  });

function cambiarFechaFin(fechaInicio, membresia) {
    let diaEnMS = 1000*60*60*24;
    let diasMembresia = obtenerDias(membresia)
    setFechaFin(convertirFecha(fechaInicio + (diasMembresia*diaEnMS)))
 
  }
  if(enviado) return <Navigate to="/clientes" />
  return (

    <Form className="w-50 mx-auto" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre(s)</Form.Label>
        <Form.Control
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name &&
        formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control
          id="lastname"
          name="lastname"
          label="Apellidos"
          value={formik.values.lastname}
          onChange={formik.handleChange}
        />
        {formik.touched.lastname &&
        formik.errors.lastname ? (
          <div>{formik.errors.lastname}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>RFC</Form.Label>
        <Form.Control
          id="rfc"
          name="rfc"
          value={formik.values.rfc}
          onChange={formik.handleChange}
        />
    {formik.touched.rfc &&
        formik.errors.rfc ? (
          <div>{formik.errors.rfc}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telefono</Form.Label>
        <Form.Control
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.touched.phone &&
        formik.errors.phone ? (
          <div>{formik.errors.phone}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Suscripcion</Form.Label>
        <Form.Select
          id="subscription"
          name="subscription"
          value={formik.values.subscription}
          onChange={ev=>{
            formik.handleChange(ev)
            setNuevaMembresia(ev.target.value)
            cambiarFechaFin(fechaInicio, ev.target.value)
            }}
        >
          <option>Selecciona la nueva opcion</option>
          <OptionsMembresia />
        </Form.Select>
        {formik.touched.subscription &&
        formik.errors.subscription ? (
          <div>{formik.errors.subscription}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nuevo inicio de Suscripcion</Form.Label>
        <Form.Control
          type="date"
          id="dateOfSubscription"
          name="dateOfSubscription"
          value={formik.values.dateOfSubscription}
          onChange={(ev)=>{
            formik.handleChange(ev);
            cambiarFechaFin(ev.target.valueAsNumber, nuevaMembresia)
            setFechaInicio(ev.target.valueAsNumber)
            }}
        />
        {formik.touched.dateOfSubscription &&
        formik.errors.dateOfSubscription ? (
          <div>{formik.errors.dateOfSubscription}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Final de la sucripcion</Form.Label>
        <Form.Control
          type="date"
          id="endOfSubscription"
          name="endOfSubscription"
          value={fechaFin}
          disabled
        />
      </Form.Group>
      <Button disabled={enviado} type="submit">Actualizar Datos</Button>
    </Form>
  );
}

export default UpdateClientForm;
