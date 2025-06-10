import conection from "./connectMySQL.js";
import Paciente from "../Model/PacienteEX.js";
export default class PacienteDB{

    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conection();
            const sql = `CREATE TABLE IF NOT EXISTS paciente (
                id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela paciente:" + erro);
        }
    }

    async consultarPaciente(){
        const conexao = await conection();
        const sql = `SELECT * FROM paciente ORDER BY nome`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaPacientes = [];
        for (const registro of registros){
            const paciente = new Paciente(registro.id,
                                        registro.nome
                                        );
            listaPacientes.push(paciente);
                                    
        }
        return listaPacientes;
    }
}