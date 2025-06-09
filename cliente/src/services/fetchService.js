const endpoint = "http://localhost:5174/motivos";

function showMessage(mensagem, tipo="success"){
    const alert = document.getElementById("alert-message");
    alert.innerHTML = `<div class="alert alert-${tipo} sm" role="alert">Mensagem: ${mensagem}</div>`
    setInterval(() => {
        alert.innerHTML = "";
    }, 5000);
}

function pegandoDados(){
    const cod = document.getElementById("codIdentify").value;
    const nome = document.getElementById("nameValid").value;
    const motivo = document.getElementById("motivoValid").value;

    return {
        "cod": cod,
        "nome": nome,
        "motivo": motivo
    }
}

function exibindoTabela(Key = ""){
    fetch(`${endpoint}/${Key}`, {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    }).then((dataResponse) => {
        if (dataResponse.status){
            const items = dataResponse.clientes;
            const divTable = document.getElementById("get-tab");
            divTable.innerHTML = "";
            if (items.length > 0){
                const header = document.createElement("tr");
                header.classList.add("spaceRow");
                header.innerHTML = `
                    <th class="colWidth">Código</th>
                    <th class="colWidth">Nome</th>
                    <th class="colWidth">Ações</th>
                `
                const card = document.createElement("tbody");
                card.classList.add("tabScrollDesc");
                card.appendChild(header)

                for (let i = 0; i < items.length; i++){
                    const row = document.createElement("tr");
                    row.classList.add("spaceRow")
                    row.innerHTML = `
                        <td class="colWidth">${items[i].cod}</td>
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
                        const delAlert = document.getElementById("deleteMessage");
                        const blockForm = document.getElementById("block");
                        blockForm.style.pointerEvents = "none";
                        blockForm.style.opacity = 0.5;
                        delAlert.style.display = "flex";
                        btnPegarDados(
                            items[i].cod,
                            items[i].nome,
                            items[i].motivo,'excluir'
                        )
                    }
                    col.appendChild(btnDel);
                    const btnUp = document.createElement('BUTTON');
                    const labelUp = document.createTextNode("Atualizar");        
                    btnUp.appendChild(labelUp);
                    btnUp.classList.add("btn","btn-warning","btn-sm","btnBox");
                    btnUp.onclick = function()
                    {
                        btnPegarDados(
                            items[i].cod,
                            items[i].nome,
                            items[i].motivo,'atualizar'
                        )
                    }
                    col.appendChild(btnUp); 
                    row.appendChild(col);
                    card.appendChild(row);
                }
                divTable.appendChild(card);
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
            exibindoTabela()
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
            cod: document.getElementById("codIdentify").value
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
            exibindoTabela()
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
            exibindoTabela()
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function btnPegarDados(cod, nome, motivo, msg = "atualizar"){
    document.getElementById("codIdentify").value = cod;
    document.getElementById("nameValid").value = nome;
    document.getElementById("motivoValid").value = motivo;

    if (msg === "atualizar"){
        document.getElementById("atualizar").disabled = false;
        document.getElementById("registrar").disabled = true;
    }

}

function resetForm(){
    document.getElementById("atualizar").disabled = true;
    document.getElementById("registrar").disabled = false;
    document.getElementById("codIdentify").value = "";
    document.getElementById("nameValid").value = "";
    document.getElementById("motivoValid").value = "";
    const control = document.getElementById("codControl");
    const delAlert = document.getElementById("deleteMessage");
    const blockForm = document.getElementById("block");
    blockForm.style.pointerEvents = "auto";
    blockForm.style.opacity = 1;
    control.style.display = "none";
    delAlert.style.display = "none";
}

const fetchService = {
    registrando,
    atualizando,
    excluindo,
    exibindoTabela,
    resetForm
}
exibindoTabela()

export default fetchService;