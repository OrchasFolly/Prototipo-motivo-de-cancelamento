const endpoint = "http://localhost:5174/motivos";

function checkCPF(cpf){
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

function showMessage(mensagem, tipo="success"){
    const alert = document.getElementById("alert-message");
    alert.innerHTML = `<div class="alert alert-${tipo} sm" role="alert">Mensagem: ${mensagem}</div>`
    setInterval(() => {
        alert.innerHTML = "";
    }, 5000);
}

function pegandoDados(){
    const cpf = document.getElementById("cpfValid").value;
    const nome = document.getElementById("nameValid").value;
    const motivo = document.getElementById("motivoValid").value;

    return {
        "cpf": cpf,
        "nome": nome,
        "motivo": motivo
    }
}

function exibindoTabela(CPF = ""){
    fetch(`${endpoint}/${CPF}`, {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    }).then((dataResponse) => {
        if (dataResponse.status){
            const items = dataResponse.clientes;
            if (items.length > 0){
                const divTable = document.getElementById("get-tab");
                divTable.innerHTML = "";

                for (let i = 0; i < items.length; i++){
                    const card = document.createElement("tbody");
                    card.classList.add("tabScrollDesc");
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td class="colWidth">${items[i].cpf}</td>
                    <td class="colWidth">${items[i].nome}</td>
                    `
                    const col = document.createElement("td");
                    col.classList.add("colWidth");
                    const btnDel = document.createElement('BUTTON');
                    const labelDel = document.createTextNode("Excluir");        
                    btnDel.appendChild(labelDel);
                    btnDel.classList.add("btn","btn-danger","btn-sm","btnTable");
                    btnDel.onclick = function()
                    {
                        btnPegarDados(
                            items[i].cpf,
                            items[i].nome,
                            items[i].motivo,'excluir'
                        )
                        excluindo()
                    }
                    col.appendChild(btnDel);
                    const btnUp = document.createElement('BUTTON');
                    const labelUp = document.createTextNode("Atualizar");        
                    btnUp.appendChild(labelUp);
                    btnUp.classList.add("btn","btn-warning","btn-sm","btnBox");
                    btnUp.onclick = function()
                    {
                        btnPegarDados(
                            items[i].cpf,
                            items[i].nome,
                            items[i].motivo,'atualizar'
                        )
                    }
                    col.appendChild(btnUp); 
                    row.appendChild(col);
                    card.appendChild(row)
                    divTable.appendChild(card);
                }
            }
            else{
                showMessage("Não há motivo", "warning");
            }
        }
        else{
            showMessage(dataResponse.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    })
}

function registrando(){
    const dadosEnviados = pegandoDados();
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosEnviados)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function excluindo(){
    fetch(endpoint, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            cpf: document.getElementById("cpfValid").value
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function atualizando(){
    const dadosEnviados = pegandoDados();
    fetch(endpoint, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dadosEnviados)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function btnPegarDados(cpf, nome, motivo, msg){
    document.getElementById("cpfValid").value = cpf;
    document.getElementById("nameValid").value = nome;
    document.getElementById("motivoValid").value = motivo;

    if (msg === "atualizar"){
        document.getElementById("atualizar").disabled = false;
        document.getElementById("registrar").disabled = true;
    }
}

const fetchService = {
    registrando,
    atualizando,
    exibindoTabela,
    checkCPF
}
exibindoTabela()

export default fetchService;