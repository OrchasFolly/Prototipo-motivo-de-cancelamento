import './ListaCancelamento.css';
import fetchService from '../services/fetchService';
import ButtonPrimary from '../components/ButtonPrimary';
import { RxReload } from 'react-icons/rx';

function handleSearch() {
  const item = document.getElementById("search").value;
  fetchService.exibindoTabela(item);
}

function ListaCancelamento() {
  return (
    <>
      <table id="list" className="tableStyle App-header-list">
        <thead>
          <tr>
            <td>
              Lista de cancelamentos
              <input id="search" className="inputList" type="text" placeholder="Search" onChange={handleSearch}/>
            </td>
          </tr>
        </thead>
        <tbody id="get-tab" className="tabScroll">
        </tbody>
        <tfoot>
          <tr>
            <td>
              <ButtonPrimary
                type={"button"}
                title={<RxReload/>}
                variant={"outline-light"} 
                anyEvent={() => {location.reload()}}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default ListaCancelamento;