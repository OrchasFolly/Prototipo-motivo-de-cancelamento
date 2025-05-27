import { Col, Row } from 'react-bootstrap';
import ButtonPrimary from '../components/ButtonPrimary';
import './Cards.css'

function Cards(props) {
  return (
    <>
      <Row>
        <Col className="list">
          <span>{props.cpf}</span>
        </Col>
        <Col className="btnList">
          <ButtonPrimary
            id="excluir"
            type={"button"}
            size={"sm"}
            title={"Deletar"}
            variant={"danger"}
            anyEvent={() => {}}
          />
          <ButtonPrimary
            type={"button"}
            size={"sm"} 
            title={"Editar"} 
            variant={"warning"}
            anyEvent={() => {}}
          />
        </Col>
      </Row>
    </>
  );
}

export default Cards;