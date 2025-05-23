
function saveRegister(){
    const cpf = document.getElementById("cpfValid").value;
    const name = document.getElementById("nameValid").value;

    if (localStorage.getItem(cpf)){
        alert("Registro já existente");
    }
    else{
        const valores = {
            "CPF":cpf,
            "Name":name
        }
        localStorage.setItem(valores.CPF, valores.Name);
    }
}

function showList(){
    let registers = [];
    let storage = localStorage.length;
    for (let i = 0; i < storage; i++) {
        const chave = localStorage.key(i);
        registers.push(chave);
    }
    return registers;
}

function delCancel(event){
    localStorage.removeItem(event);
    window.open("/ListaCancelamento", "_self");
}

const services = {
    saveRegister,
    showList,
    delCancel
};

export default services;