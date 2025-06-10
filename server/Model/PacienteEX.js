import PacienteDB from "../DataBase/pacienteDB.js";
export default class Paciente {

    #id;
    #nome;

    constructor(id, nome) {
        this.#id = id;
        this.#nome = nome;
    }

    

    get cod() {
        return this.#id;
    }

    set cod(newCod) {
        this.#id = newCod;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {    
        this.#nome = novoNome;
    }

    //formato JSON de um objeto
    toJSON(){
        return {
            "cod": this.#id,
            "nome": this.#nome,
        }
    }

    async consultarPaciente(){
        const candDB = new PacienteDB();
        return await candDB.consultarPaciente(this);
    }
}