const endpoint = "http://localhost:5174/motivos";

function showMessage(message, type="success"){
    const alert = document.getElementById("alert-message");
    alert.innerHTML = `<div class="alert alert-${type} sm" role="alert">Mensagem: ${message}</div>`
    setInterval(() => {
        alert.innerHTML = "";
    }, 5000);
}

function gettingData(){
    const cod = document.getElementById("codId").value;
    const motivo = document.getElementById("motivoId").value;

    return {
        "cod": cod,
        "motivo": motivo
    }
}

function displayTable(Key = ""){
    fetch(`${endpoint}/${Key}`, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((dataReceived) => {
        if (dataReceived.status){
            const items = dataReceived.clients;
            const divTable = document.getElementById("get-tab");
            divTable.innerHTML = "";
            if (items.length > 0){
                const header = document.createElement("tr");
                header.classList.add("spaceRow");
                header.innerHTML = `
                    <th class="spaceCol">Código</th>
                    <th class="spaceCol">Motivo</th>
                    <th class="spaceCol">Ações</th>
                `
                const card = document.createElement("tbody");
                card.classList.add("tabScrollDesc");
                card.appendChild(header)

                for (let i = 0; i < items.length; i++){
                    const row = document.createElement("tr");
                    row.classList.add("spaceRow");
                    row.innerHTML = `
                        <td class="spaceCol">${items[i].cod}</td>
                        <td class="spaceName">${items[i].motivo}</td>
                    `

                    const col = document.createElement("td");
                    col.classList.add("spaceCol");
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
                        btnGetData(
                            items[i].cod,
                            items[i].motivo,'delete'
                        )
                    }
                    col.appendChild(btnDel);
                    const btnUp = document.createElement('BUTTON');
                    const labelUp = document.createTextNode("Atualizar");        
                    btnUp.appendChild(labelUp);
                    btnUp.classList.add("btn","btn-warning","btn-sm","btnBox");
                    btnUp.onclick = function()
                    {
                        btnGetData(
                            items[i].cod,
                            items[i].motivo,'update'
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
            showMessage(dataReceived.message, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    })
}

function registering(){
    const readyData = gettingData();
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(readyData)
    }).then((response) => {
        return response.json();
    }).then((dataReceived) => {
        if (dataReceived.status){
            showMessage(dataReceived.message, "success");
            displayTable()
        }
        else{
            showMessage(dataReceived.message, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function deleting(){
    fetch(endpoint, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            cod: document.getElementById("codId").value
        })
    }).then((response) => {
        return response.json();
    }).then((dataReceived) => {
        if (dataReceived.status){
            showMessage(dataReceived.message, "success");
            displayTable()
        }
        else{
            showMessage(dataReceived.message, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function updating(){
    const readyData = gettingData();
    fetch(endpoint, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(readyData)
    }).then((response) => {
        return response.json();
    }).then((dataReceived) => {
        if (dataReceived.status){
            showMessage(dataReceived.message, "success");
            displayTable()
        }
        else{
            showMessage(dataReceived.message, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function btnGetData(cod, motivo, msg = "update"){
    document.getElementById("codId").value = cod;
    document.getElementById("motivoId").value = motivo;

    if (msg === "update"){
        document.getElementById("update").disabled = false;
        document.getElementById("register").disabled = true;
    }

}

function resetForm(){
    document.getElementById("update").disabled = true;
    document.getElementById("register").disabled = false;
    document.getElementById("codId").value = "";
    document.getElementById("motivoId").value = "";
    const control = document.getElementById("codControl");
    const delAlert = document.getElementById("deleteMessage");
    const blockForm = document.getElementById("block");
    blockForm.style.pointerEvents = "auto";
    blockForm.style.opacity = 1;
    control.style.display = "none";
    delAlert.style.display = "none";
}

const fetchService = {
    registering,
    updating,
    deleting,
    displayTable,
    resetForm
}
displayTable();

export default fetchService;