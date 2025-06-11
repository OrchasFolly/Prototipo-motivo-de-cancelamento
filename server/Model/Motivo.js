import MotivoDB from "../DataBase/motivoDB.js";
export default class MotivoCancelamento {

    #cod;
    #motivo;

    constructor(cod, motivo) {
        this.#cod = cod;
        this.#motivo = motivo
    }

    

    get cod() {
        return this.#cod;
    }

    set cod(newCod) {
        this.#cod = newCod;
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