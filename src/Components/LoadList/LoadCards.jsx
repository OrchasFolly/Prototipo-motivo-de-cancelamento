import services from '../../services/storageService.js';
import Cards from '../Cards.jsx';

function LoadCards() {
  const data = services.showList();
  let count = [];
  for(let i = 0; i < data.length; i++){
    const chave = localStorage.key(i);
    count.push(
        <Cards cpf={chave}/>
    );
  }
  return count;
}

export default LoadCards