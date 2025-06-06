import './AlertMessage.css'
import Alert from 'react-bootstrap/Alert';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import fetchService from '../../services/fetchService';

function AlertMessage() {

  const handleCancel = () => {
    fetchService.resetForm()
  }

  const handleExcluir = () => {
    fetchService.excluindo()
    fetchService.resetForm()
  }

  return (
    <>
        <Alert id="AlertMessage" className="alertMsg" variant="danger">
            <Alert.Heading>Warning</Alert.Heading>
            <p>
            Deseja realmente excluir?
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <ButtonPrimary type={"button"} variant={"secondary"} title={"Cancel"}
                    anyEvent={handleCancel}
                />
                <ButtonPrimary type={"button"} variant={"danger"} title={"Excluir"}
                    anyEvent={handleExcluir}
                />
            </div>
        </Alert>
    </>
  );
}

export default AlertMessage;