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
                const sql = `INSERT INTO cancelamento (motivo)
                            VALUES (?)`;
                const parametros = [
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
                            motivo = ?
                            WHERE cod = ?`;            
                const parametros = [
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
        const sql = `SELECT * FROM cancelamento ORDER BY motivo`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaMotivos = [];
        for (const registro of registros){
            const cliente = new MotivoCancelamento(registro.cod,
                                        registro.motivo
                                        );
            listaMotivos.push(cliente);
                                    
        }
        return listaMotivos;
    }
    
    async consultarPelaChave(key){
        const conexao = await conection();
        const sql = `SELECT * FROM cancelamento WHERE cod LIKE '%${key}%'`;
        const [registros, campos] = await conexao.execute(sql, [key]);
        await conexao.release();
        let listaMotivos = [];
        for (const registro of registros){
            const cliente = new MotivoCancelamento(registro.cod,
                                        registro.motivo
                                        );
            listaMotivos.push(cliente);
                                    
        }
        return listaMotivos;
    }
}