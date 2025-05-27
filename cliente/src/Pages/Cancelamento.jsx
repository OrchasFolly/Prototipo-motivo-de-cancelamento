import './Cancelamento.css';
import ButtonPrimary from '../components/ButtonPrimary';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'; 
import { Col, Row } from 'react-bootstrap';
import services from '../services/storageService.js';

function Cancelamento() {
  const [validated, setValidated] = useState(false);

  function changePage(){
    const listCancels = document.getElementById("displayList");
    const form = document.getElementById("formRegister");
    form.style.display="none"
    listCancels.style.display="flex";
  }
  
  function checkCPF(cpf) {
    cpf = cpf.replace(/\D/g,"");
    if(cpf.length !== 11){
        return false;
    }

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        ].indexOf(cpf) !== -1){;
        return false;
        }

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11)
        resto = 0;
      
    return resto === parseInt(cpf.charAt(10));
  }

  const handleValidation = (event) => {
    const form = event.currentTarget;
    const cpf = document.getElementById("cpfValid")
    const alertCPF = document.getElementById("alertCPF");
    if (!form.checkValidity() || !checkCPF(cpf.value)){
      event.preventDefault();
      event.stopPropagation();
      if (!checkCPF(cpf.value)){
        alertCPF.style.display="flex";
      }
      else {
        alertCPF.style.display="none";
      }
      form.classList.add('was-validated');
      setValidated(false);
    }
    else{
      form.classList.add('was-validated');
      setValidated(true);
      services.saveRegister();
    }
  }

  return (
    <>
      <Form id="formRegister" className="App-header-cancelamento" onSubmit={handleValidation} validated={validated} noValidate>
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
            CPF
            <Form.Group>
              <input
                id="cpfValid"
                name="cpfForm"
                type="text"
                size={40}
                required
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
            <Form.Control.Feedback type="invalid" className="as">
              Descreva uma justificativa
            </Form.Control.Feedback>
          </Form.Label>
        </Row>
        
        <Row>
          <Col>
            <ButtonPrimary 
              type={"submit"} 
              title={"Registrar ?"} 
              variant={"danger"}
            />
            <ButtonPrimary 
              type={"reset"} 
              title={"Limpar"} 
              variant={"secondary"}
            />
            <ButtonPrimary 
              type={"button"}
              title={"Lista"} 
              variant={"secondary"} 
              anyEvent={() => {changePage()}}
            />
          </Col>
          <div id="alert-message"></div>
        </Row>
      </Form>
    </>
  );
}

export default Cancelamento;