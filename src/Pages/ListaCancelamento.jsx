import './Cancelamento.css';
import './ListaCancelamento.css';
import ButtonPrimary from '../components/ButtonPrimary';
import LoadCards from '../Components/LoadList/LoadCards';

function ListaCancelamento() {
  return (
    <>
      <table className="App-header-cancelamento">
        <thead className="title">
          <tr>
            <td>
              Lista de cancelamentos
            </td>
          </tr>
        </thead>
        <tbody className="tabScroll">
          <tr>
            <td>
              <LoadCards/>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <ButtonPrimary 
                type={"button"} 
                title={"Voltar"} 
                variant={"secondary"} 
                anyEvent={() => {window.open("/", "_self")}}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default ListaCancelamento;