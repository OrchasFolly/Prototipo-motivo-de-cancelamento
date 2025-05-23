import { Col } from 'react-bootstrap';
import ButtonPrimary from '../components/ButtonPrimary';
import services from '../services/storageService';
import './Cards.css'

function Cards(props) {
  return (
    <>
      <Col className="list">   
        <span>{props.cpf}</span>
        <ButtonPrimary 
          type={"button"} 
          title={"Deletar"} 
          variant={"danger"}
          anyEvent={() => {services.delCancel(props.cpf)}}
        />
      </Col>
    </>
  );
}

export default Cards;