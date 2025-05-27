import conection from "./connectMySQL.js";
import MotivoCancelamento from "../Model/Motivo.js";
export default class MotivoDB{

    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conection();
            const sql = `CREATE TABLE IF NOT EXISTS motivo (
                cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                motivo VARCHAR(255) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela motivo:" + erro);
        }

    }

    async gravar(cliente){
        if (cliente instanceof MotivoCancelamento){
            const conexao = await conection();
            const sql = `INSERT INTO motivo (cpf, nome, motivo)
                         VALUES ( ?, ?, ?, ?, ?, ?, ? )`;
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.motivo
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
                         
        }
    }

    async alterar(cliente){
        if (cliente instanceof MotivoCancelamento){
            const conexao = await conection();
            const sql = `UPDATE motivo SET 
                         nome = ?, motivo = ?
                         WHERE cpf = ?`;            
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.motivo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof MotivoCancelamento){
            const conexao = await conection();
            const sql = `DELETE FROM motivo WHERE cpf = ?`;
            const parametros = [cliente.cpf];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(){
        const conexao = await conection();
        const sql = `SELECT * FROM motivo ORDER BY nome`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaMotivos = [];
        for (const registro of registros){
            const cliente = new MotivoCancelamento(registro.cpf,
                                        registro.nome,
                                        registro.motivo
                                        );
            listaMotivos.push(cliente);
                                    
        }
        return listaMotivos;
    }
    
    async consultarPelaChave(cpf){
        const conexao = await conection();
        const sql = `SELECT * FROM motivo WHERE cpf = ?`;
        const [registros, campos] = await conexao.execute(sql, [cpf]);
        await conexao.release();
        let listaMotivos = [];
        for (const registro of registros){
            const cliente = new MotivoCancelamento(registro.cpf,
                                        registro.nome,
                                        registro.motivo
                                        );
            listaMotivos.push(cliente);
                                    
        }
        return listaMotivos;
    }
}