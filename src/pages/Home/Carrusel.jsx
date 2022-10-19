import { useEffect, useState } from "react";
import { getEventos } from "../../controllers/getEventos";
import { Carousel } from "react-bootstrap";
import { Container } from 'react-bootstrap'


const Carrusel = () => {
    let [eventos, setEventos] = useState(null)
    useEffect(()=>{
      getEventos().then(data=>{
        setEventos(data)
      })
    },[])
    if (!eventos) {
      return (
        <Container>
          <h2>Cargando</h2>
        </Container>
      )
    }else{
      return (
        <Carousel>
        {eventos.map((item, index) => {
          return (
            <Carousel.Item key={index} className='bg-dark'>
              <img
                className="img-fluid"
                src={item.image}
                alt="First slide"
                style={{width:"100%", height:"100vh",objectFit:"cover"}}
              />
              <Carousel.Caption>
                <h3 className="car-title">{item.title}</h3>
                <span className="car-date">Fecha: {new Date(item.date).toDateString() }</span>
                <p className="car-text">{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      )
    }
  };

  export default Carrusel