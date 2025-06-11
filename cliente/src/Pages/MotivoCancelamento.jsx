import './MotivoCancelamento.css';
import Form from 'react-bootstrap/Form';
import ButtonPrimary from '../Components/Buttons/ButtonPrimary';
import ListaCancelamento from './ListaCancelamento';
import fetchService from '../services/fetchService';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';

function Motivo() {

  const [open, openList] = useState(false);

  const hangleDisplay = () => {
    openList(!open);
    let change = document.getElementById("exib");
    change.style.display = !open ? "flex" : "none";
  }

  const handleSearch = () => {
    const item = document.getElementById("search").value;
    fetchService.exibindoTabela(item);
  }
  
  const handleReset = () => {
    fetchService.resetForm()
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
    }
  }

  return (
    <>
      <div id="block" className="Main-Style">
        <Form id="formRegister" className="Form-Style" onSubmit={handleValidation} noValidate>
          <Row className="title">
            <h1>Motivo de cancelamento</h1>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-1" mb="3" id="codControl">
                <Form.Label>Código</Form.Label>
                <Form.Control id="codIdentify" type="text"/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
                <Form.Label>Motivo</Form.Label>
                <Form.Control id="motivoValid" as="textarea" minLength={10}
                    maxLength={255} rows={3} required/>
            </Form.Group>
          </Row>
          <Row className="ButtonBox">
            <Col className="PrimaryGroup">
                <ButtonPrimary id={"registrar"} type={"submit"} variant={"success"}
                  title={"Registrar"}
                />
                <ButtonPrimary id={"atualizar"} type="submit" variant={"warning"}
                  title={"Atualizar"} disabled={true}
                />
                <ButtonPrimary type={"reset"} variant={"secondary"} title={"Limpar"}
                  anyEvent={handleReset}
                />
            </Col>
            <Col className="SecondaryGroup">
                <ButtonPrimary type={"button"} variant={"secondary"} title={!open ? "Mostrar" : "Esconder"}
                  anyEvent={hangleDisplay}
                />
            </Col>
          </Row>
          <div id="alert-message"></div>
        </Form>
        <div id="exib">
            <div className="alignSearch">
                <input id="search" className="searchItem" placeholder="Search" onChange={handleSearch}/>
            </div>
            <ListaCancelamento/>
        </div>
      </div>
    </>
  );
}

export default Motivo;