import MotivoCancelamento from "../Model/Motivo.js"

export default class MotivoControl{
    // Requisição POST
    gravar(req, res){
        res.type('application/json');
        console.log("req")

        if(req.method === "POST" && req.is('application/json')){
            const dados = req.body;
            const motivo = dados.motivo;

            if(motivo){
                const cliente = new MotivoCancelamento(null, motivo);
                cliente.gravar().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Gravado com sucesso"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    status: false,
                    message: "Informe todos os dados corretos"
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }

    // Requisição PUT
    alterar(req, res){
        res.type('application/json');
        console.log("req")

        if(req.method === "PUT" && req.is('application/json')){
            const dados = req.body;
            const cod = dados.cod;
            const motivo = dados.motivo;

            if(cod && motivo){
                const cliente = new MotivoCancelamento(cod, motivo);
                cliente.alterar().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Atualizado com sucesso"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    status: false,
                    message: "Informe todos os dados corretos"
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }

    // Excluir dado
    excluir(req, res){
        res.type('application/json');
        console.log("req")

        if(req.method === "DELETE" && req.is('application/json')){
            const dados = req.body;
            const cod = dados.cod;

            if(cod){
                const cliente = new MotivoCancelamento(cod);
                cliente.excluir().then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Deletado com sucesso"
                    });
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                res.status(400).json({
                    status: false,
                    message: "Informe todos os dados corretos"
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }

    // Consultar todos os dados
    consultar(req, res){
        res.type('application/json');
        console.log("req")

        if(req.method === "GET"){
            const cliente = new MotivoCancelamento();

            if (req.params.key){
                cliente.consultarPelaChave(req.params.key).then((listaMotivos) => {
                        res.status(200).json(
                            {
                                "status": true,
                                "clients": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
            else{
                cliente.consultar('').then((listaMotivos) => {
                        res.status(200).json(
                            {
                                "status": true,
                                "clients": listaMotivos
                            }
                        );
                }).catch((erro) => {
                    res.status(500).json({
                        status: false,
                        message: erro.message
                    });
                });
            }
        }
        else{
            res.status(400).json({
                status:false,
                message:"Método negado ou não permitido"
            });
        }
    }
}