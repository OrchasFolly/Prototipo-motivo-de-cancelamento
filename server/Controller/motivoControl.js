import MotivoCancelamento from "../Model/Motivo.js"

export default class MotivoControl{

    gravar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const motivo = dados.motivo;

            if(cpf && nome && motivo){
                const cliente = new MotivoCancelamento(cpf, nome, motivo);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Gravado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Requisição PUT
    alterar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const motivo = dados.motivo;

            if(cpf && nome && motivo){
                const cliente = new MotivoCancelamento(cpf, nome, motivo);
                cliente.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Atualizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Excluir dado
    excluir(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;

            if(cpf){
                const cliente = new MotivoCancelamento(cpf);
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Deletado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretos"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }

    // Consultar todos os dados
    consultar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const cliente = new MotivoCancelamento();

            if (requisicao.params.cpf){
                cliente.consultarPelaChave(requisicao.params.cpf).then((listaMotivos) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
            else{
                cliente.consultar('').then((listaMotivos) => {
                        resposta.status(200).json(
                            {
                                "status": true,
                                "clientes": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }
}