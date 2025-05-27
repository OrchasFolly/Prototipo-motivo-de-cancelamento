
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

function del(event){
    localStorage.removeItem(event);
    window.open("/motivo-cancelamento", "_self")
}

function edit(event){
    const listCancels = document.getElementById("displayList");
    const form = document.getElementById("formRegister");
    form.style.display="flex"
    listCancels.style.display="none";
    document.getElementById("cpfValid").value = event;
}

const services = {
    saveRegister,
    showList,
    del,
    edit
};

export default services;