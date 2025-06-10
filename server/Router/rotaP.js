import { Router } from "express";
import PacienteControl from "../Controller/pacienteControlEX.js";

const rotaPaciente = new Router();
const pacienteControl = new PacienteControl();

// Definição de endpoints do candidato
rotaPaciente.get('/',pacienteControl.consultar);

export default rotaPaciente;