import Anuncio from "./Anuncio.js";

class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia, alarma=false, abs=false, aire=false, cristales=false) {
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
        this.alarma = alarma;
        this.abs = abs;
        this.aire = aire;
        this.cristales = cristales;
    }
}

export default Anuncio_Auto;