import MotivoDB from "../DataBase/motivoDB.js";
export default class MotivoCancelamento {

    #cod;
    #nome;
    #motivo;

    constructor(cod, nome, motivo) {
        this.#cod = cod;
        this.#nome = nome;
        this.#motivo = motivo
    }

    

    get cod() {
        return this.#cod;
    }

    set cod(newCod) {
        this.#cod = newCod;
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
            "cod": this.#cod,
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

    async consultarPelaChave(key){
        const candDB = new MotivoDB();
        return await candDB.consultarPelaChave(key);
    }
}