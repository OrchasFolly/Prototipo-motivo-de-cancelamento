import conection from "./connectMySQL.js";
import MotivoCancelamento from "../Model/Motivo.js";
export default class MotivoDB{

    constructor(){
        this.init();
    }

    async init(){
        try {
            const conexao = await conection();
            const sql = `CREATE TABLE IF NOT EXISTS cancelamento (
                cod INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                motivo VARCHAR(255) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch ( erro ) {
            console.log("Erro ao iniciar a tabela cancelamento:" + erro);
        }
    }

    async gravar(cliente){
        if (cliente instanceof MotivoCancelamento){
            try {
                const conexao = await conection();
                const sql = `INSERT INTO cancelamento (nome, motivo)
                            VALUES (?, ?)`;
                const parametros = [
                    cliente.nome,
                    cliente.motivo
                ];

                await conexao.execute(sql, parametros);
                await conexao.release();
            } catch ( erro ) {
                console.log(erro);
            }
        }
    }

    async alterar(cliente){
        if (cliente instanceof MotivoCancelamento){
            try {
                const conexao = await conection();
                const sql = `UPDATE cancelamento SET 
                            nome = ?, motivo = ?
                            WHERE cod = ?`;            
                const parametros = [
                    cliente.nome,
                    cliente.motivo,
                    cliente.cod
                ];
                await conexao.execute(sql, parametros);
                await conexao.release();
            } catch ( erro ) {
                console.log(erro);
            }
        }
    }

    async excluir(cliente){
        if (cliente instanceof MotivoCancelamento){
            try {
                const conexao = await conection();
                const sql = `DELETE FROM cancelamento WHERE cod = ?`;
                const parametros = [cliente.cod];
                await conexao.execute(sql, parametros);
                await conexao.release();
            } catch ( erro ) {
                console.log(erro);
            }
        }
    }

    async consultar(){
        const conexao = await conection();
        const sql = `SELECT * FROM cancelamento ORDER BY nome`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaMotivos = [];
        for (const registro of registros){
            const cliente = new MotivoCancelamento(registro.cod,
                                        registro.nome,
                                        registro.motivo
                                        );
            listaMotivos.push(cliente);
                                    
        }
        return listaMotivos;
    }
    
    async consultarPelaChave(key){
        const conexao = await conection();
        const sql = `SELECT * FROM cancelamento WHERE nome LIKE '%${key}%' OR cod LIKE '%${key}%'`;
        const [registros, campos] = await conexao.execute(sql, [key]);
        await conexao.release();
        let listaMotivos = [];
        for (const registro of registros){
            const cliente = new MotivoCancelamento(registro.cod,
                                        registro.nome,
                                        registro.motivo
                                        );
            listaMotivos.push(cliente);
                                    
        }
        return listaMotivos;
    }
}