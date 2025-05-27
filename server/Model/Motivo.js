import MotivoDB from "../DataBase/motivoDB.js";
export default class MotivoCancelamento {

    #cpf;
    #nome;
    #motivo;

    constructor(cpf, nome, motivo) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#motivo = motivo
    }

    

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {    
        this.#nome = novoNome;
    }

    get motivo() {
        return this.#motivo;
    }

    set motivo(novoMotivo) {    
        this.#motivo = novoMotivo;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "motivo": this.#motivo
        }
    }

    async gravar(){
        const candDB = new MotivoDB();
        candDB.gravar(this);
    }

    async alterar(){
        const candDB = new MotivoDB();
        candDB.alterar(this);
    }

    async excluir(){
        const candDB = new MotivoDB();
        candDB.excluir(this);
    }

    async consultar(){
        const candDB = new MotivoDB();
        return await candDB.consultar(this);
    }

    async consultarPelaChave(cpf){
        const candDB = new MotivoDB();
        return await candDB.consultarPelaChave(cpf);
    }
}