import { Router } from "express";
import MotivoControl from "../Controller/motivoControl.js";

const rotaMotivo = new Router();
const motivoControl = new MotivoControl();

// Definição de endpoints do candidato
rotaMotivo.post('/', motivoControl.gravar)
.put('/',motivoControl.alterar)
.delete('/',motivoControl.excluir)
.get('/',motivoControl.consultar)
.get('/:cpf',motivoControl.consultar);

export default rotaMotivo;

