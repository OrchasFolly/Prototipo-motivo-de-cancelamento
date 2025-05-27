import { Col, Row } from 'react-bootstrap';
import ButtonPrimary from '../components/ButtonPrimary';
import services from '../services/storageService';
import './Cards.css'
import LoadCards from './LoadList/LoadCards';

function Cards(props) {
  return (
    <>
      <Row>
        <Col className="list">
          <span>{props.cpf}</span>
        </Col>
        <Col className="btnList">
          <ButtonPrimary
            type={"button"}
            size={"sm"}
            title={"Deletar"}
            variant={"danger"}
            anyEvent={() => {services.del(props.cpf)}}
          />
          <ButtonPrimary
            type={"button"}
            size={"sm"} 
            title={"Editar"} 
            variant={"warning"}
            anyEvent={() => {services.edit(props.cpf)}}
          />
        </Col>
      </Row>
    </>
  );
}

export default Cards;