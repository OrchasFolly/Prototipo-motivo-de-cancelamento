import Paciente from "../Model/PacienteEX.js"

export default class PacienteControl{

    // Consultar todos os dados
    consultar(requisicao, resposta){
        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const paciente = new Paciente();

            paciente.consultarPaciente('').then((listaPacientes) => {
                    resposta.status(200).json(
                        {
                            "status": true,
                            "pacientes": listaPacientes
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
            resposta.status(400).json({
                status:false,
                mensagem:"Método negado ou não permitido"
            });
        }
    }
}