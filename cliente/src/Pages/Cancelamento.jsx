import './Cancelamento.css';
import Form from 'react-bootstrap/Form';
import fetchService from '../services/fetchService.js';
import ButtonPrimary from '../Components/Buttons/ButtonPrimary.jsx';
import ListaCancelamento from './ListaCancelamento.jsx';
import { Col, Row } from 'react-bootstrap';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useState } from 'react';

function Cancelamento() {

  const [open, openList] = useState(false);

  function hangleDisplay(){
    openList(!open);
    let change = document.getElementById("list");
    change.style.display= !open ? "flex" : "none";
  }

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()){
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    }
    else{
      form.classList.add('was-validated');
      !document.getElementById("registrar").disabled ? fetchService.registrando() : fetchService.atualizando();
      fetchService.exibindoTabela();
    }
  }

  const handleAtualizar = () => {
    document.getElementById("atualizar").onClick = fetchService.atualizando;
  }
  const handleRegistrar = () => {
    document.getElementById("registrar").onClick = fetchService.registrando;
  }
  
  return (
    <>
      <div className="App-header-cancelamento">
        <Form id="formRegister" className="App-header-cancelamento" onSubmit={handleValidation} noValidate>
          <h1 className="title">Motivo de cancelamento</h1>

          <Row>
            <Form.Label className="col-form">
              Nome
              <Form.Group>
                <input
                  id="nameValid"
                  name="nameForm"
                  type="text"
                  size={40}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o nome
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Label>
          </Row>

          <Row>
            <Form.Label className="col-form">
              Identificação
              <Form.Group>
                <input
                  id="codIdentify"
                  name="cpfForm"
                  type="text"
                  size={40}
                  maxLength={14}
                />
                <small id="alertCPF" className="alertCode" variant="danger">
                  Informe um CPF valido
                </small>
              </Form.Group>
            </Form.Label>
          </Row>

          <Row className="description">
            Perante o cancelamento feito ao inscrito 
            em nossa base de dados como cancelado,
            informe o motivo pelo qual houve está solicitação.
          </Row>

          <Row>
            <Form.Label className="col-form">
              Motivo
              <textarea 
                id="motivoValid"
                name="motivo" 
                rows="5" 
                cols="50"
                minLength={10}
                maxLength={255}
                spellCheck={true}
                required
              />
              <Form.Control.Feedback type="valid">
                Cancelamento pronto
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Descreva uma justificativa
              </Form.Control.Feedback>
            </Form.Label>
          </Row>
          
          <Row>
            <Col>
              <ButtonPrimary
                id={"registrar"}
                type={"submit"}
                variant={"danger"}
                title={"Registrar"}
                anyEvent={() => {handleRegistrar}}
              />
              <ButtonPrimary 
                id="atualizar"
                type="submit"
                variant={"warning"}
                title={"Atualizar"}
                anyEvent={() => {handleAtualizar}}
                disabled={true}
              />
              <ButtonPrimary
                type={"reset"}
                variant={"secondary"}
                title={"Limpar"}
                anyEvent={() => {fetchService.resetForm()}}
              />
            </Col>
          </Row>
          <div id="alert-message"></div>
          <Row>
            <button type="button" className="displayList" onClick={hangleDisplay}><TiArrowSortedDown/></button>
          </Row>
        </Form>
        <ListaCancelamento/>
      </div>
    </>
  );
}

export default Cancelamento;