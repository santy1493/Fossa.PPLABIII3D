//import {empleados} from "../data/datos.js";
import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./Anuncio_Auto.js";

const autos = localStorage.getItem('autos')?JSON.parse(localStorage.getItem('autos')):[];
let idSeleccionado = 0;
let idAModificar = 0;

actualizarTabla(autos);

console.log(autos);

const $frmAuto = document.forms[0];
const $checkBoxes = document.querySelectorAll('input[type=checkbox]');
console.log($checkBoxes);

const $btnBaja = document.getElementById('bajaAuto');
const $btnModificar = document.getElementById('modificarAuto');
const $btnAlta = document.getElementById('altaAuto');
const $btnCancelar = document.getElementById('cancelar');

function esconderBotones() {
    $btnAlta.hidden = false;
    $btnModificar.hidden = true;
    $btnBaja.hidden = true;
    $btnCancelar.hidden = true;
}

function mostrarBotones() {
    $btnAlta.hidden = true;
    $btnModificar.hidden = false;
    $btnBaja.hidden = false;
    $btnCancelar.hidden = false;
}
esconderBotones();

$frmAuto.addEventListener('submit', (e)=>{

    const frm = e.target;
    console.log(frm);

    e.preventDefault();

    //validar datos del formulario

    const nuevoAuto = new Anuncio_Auto(
        Date.now(), 
        frm.titulo.value, 
        frm.transaccion.value, 
        frm.descripcion.value, 
        frm.precio.value, 
        frm.puertas.value,
        frm.kms.value,
        frm.potencia.value

    );

    VerificarCheckbox(nuevoAuto);

    console.log(nuevoAuto);


    
    autos.push(nuevoAuto);
    localStorage.setItem('autos', JSON.stringify(autos));
    Swal.fire('Anuncio creado!','Se creo con exito el anuncio','success');
    actualizarTabla(autos);
    $frmAuto.reset();

})

function eliminarAnuncio() {

    if(idSeleccionado != 0) {
        
        autos.forEach((elemento, index)=>{
            if(elemento['id'] == idSeleccionado) {
                autos.splice(index,1);
            }
        });
    
        localStorage.setItem('autos', JSON.stringify(autos));
        Swal.fire('Anuncio eliminado!','Se elimino con exito el anuncio','error');
        actualizarTabla(autos);
        idSeleccionado = 0;
        esconderBotones();
        $frmAuto.reset();
    }
    
}

function modificarAnuncio() {

    if(idAModificar == 0) {
        if(idSeleccionado != 0) {
        
            $btnBaja.disabled = true;
            autos.forEach((elemento, index)=>{
                if(elemento['id'] == idSeleccionado) {
                    idAModificar = elemento['id'];
                    $frmAuto.titulo.value = elemento['titulo'];
                    $frmAuto.transaccion.value = elemento['transaccion'];
                    $frmAuto.descripcion.value = elemento['descripcion'];
                    $frmAuto.precio.value = elemento['precio'];
                    $frmAuto.puertas.value = elemento['puertas'];
                    $frmAuto.kms.value = elemento['kms'];
                    $frmAuto.potencia.value = elemento['potencia'];

                   // VerificarCheckboxModificar(elemento);
                   VerificarAccesorios(elemento);
                }
            });
        }
    }
    else {

        autos.forEach((elemento)=>{
            if(elemento['id'] == idAModificar) {
                
                elemento['titulo'] = $frmAuto.titulo.value;
                elemento['transaccion'] = $frmAuto.transaccion.value;
                elemento['descripcion'] = $frmAuto.descripcion.value;
                elemento['precio'] = $frmAuto.precio.value;
                elemento['puertas'] = $frmAuto.puertas.value;
                elemento['kms'] = $frmAuto.kms.value;
                elemento['potencia'] = $frmAuto.potencia.value;

                VerificarCheckbox(elemento);
            }
        });

        idSeleccionado = 0;
        idAModificar = 0;
        $btnBaja.disabled = false;
        esconderBotones();
        localStorage.setItem('autos', JSON.stringify(autos));
        actualizarTabla(autos);
        Swal.fire('Anuncio modificado!','Se modifico con exito el anuncio','info');
        $frmAuto.reset();
    }
    
    
}

window.addEventListener('click', (e) => {

    if(e.target.matches('tr td')) {
        console.log(e.target.parentElement.dataset.id);
        idSeleccionado = e.target.parentElement.dataset.id;
        idAModificar = 0;
        mostrarBotones();
    }
    else if(e.target.matches('#bajaAuto')) {
        eliminarAnuncio(idSeleccionado);
    }
    else if(e.target.matches('#modificarAuto')) {
        modificarAnuncio(idSeleccionado);
    }
    else if(e.target.matches('#cancelar')) {
        esconderBotones();
        $frmAuto.reset();
    }

});

function actualizarTabla(vec) {
 
    const container = document.querySelector('.table-container');
    const $spinner = document.getElementById('spinner');
    container.hidden = true;
    $spinner.hidden = false;

    setTimeout(()=>{
        $spinner.hidden = true; 
        container.hidden = false;
    }, 3000);

    while(container.children.length>0){
        container.removeChild(container.firstElementChild);
    }
    if(vec.length>0){
        container.appendChild(crearTabla(vec));
    }
}

function VerificarCheckbox(auto) {

    auto.alarma = false;
    auto.abs = false;
    auto.aire = false;
    auto.cristales = false;

    for(let i=0;i<$checkBoxes.length;i++) {
        if($checkBoxes[i].value == 'alarma' && $checkBoxes[i].checked) {
            auto.alarma = true;
        }
        else if($checkBoxes[i].value == 'abs' && $checkBoxes[i].checked) {
            auto.abs = true;
        }
        else if($checkBoxes[i].value == 'aire' && $checkBoxes[i].checked) {
            auto.aire = true;
        }
        else if($checkBoxes[i].value == 'cristales' && $checkBoxes[i].checked) {
            auto.cristales = true;
        }
    }

}

/*function VerificarCheckboxModificar(auto) {

    for(let i=0;i<$checkBoxes.length;i++) {
        if($checkBoxes[i].value == 'alarma' && $checkBoxes[i].checked) {
            auto['alarma'] = true;
        }
        else if($checkBoxes[i].value == 'abs' && $checkBoxes[i].checked) {
            auto['abs'] = true;
        }
        else if($checkBoxes[i].value == 'aire' && $checkBoxes[i].checked) {
            auto['aire'] = true;
        }
        else if($checkBoxes[i].value == 'cristales' && $checkBoxes[i].checked) {
            auto['cristales'] = true;
        }
    }

}*/

function VerificarAccesorios(auto) {

    for(let i=0;i<$checkBoxes.length;i++) {
        $checkBoxes[i].checked = false;
    }

    for(let i=0;i<$checkBoxes.length;i++) {
        if($checkBoxes[i].value == 'alarma' && auto.alarma) {
            $checkBoxes[i].checked = true;
        }
        else if($checkBoxes[i].value == 'abs' && auto.abs) {
            $checkBoxes[i].checked = true;
        }
        else if($checkBoxes[i].value == 'aire' && auto.aire) {
            $checkBoxes[i].checked = true;
        }
        else if($checkBoxes[i].value == 'cristales' && auto.cristales) {
            $checkBoxes[i].checked = true;
        }
    }
}