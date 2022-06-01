function crearAnuncios(vec){

    const anuncios = document.createElement('div');
    anuncios.appendChild(crearCuerpo(vec));
    return anuncios;
}

function crearCuerpo(vec){
    
    const listaAnuncios = document.createElement('div');

    vec.forEach((elemento) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const titulo = document.createElement('h2');
        titulo.textContent = elemento['titulo'];

        const descripcion = document.createElement('h4');
        descripcion.textContent = elemento['descripcion'];


        const precio = document.createElement('h4');
        precio.textContent = elemento['precio'];

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'caracteristicas');

        const puertas = document.createElement('li');
        puertas.setAttribute('class', 'inline');
        puertas.textContent = 'Puertas: '+  elemento['puertas'];

        const kms = document.createElement('li');
        kms.setAttribute('class', 'inline');
        kms.textContent = 'KMs: ' + elemento['kms'];

        const potencia = document.createElement('li');
        potencia.setAttribute('class', 'inline');
        potencia.textContent = 'Potencia: ' + elemento['potencia'];

        ul.appendChild(puertas);
        ul.appendChild(kms);
        ul.appendChild(potencia);

        const btn = document.createElement('button');
        btn.setAttribute('class', 'boton');
        btn.textContent = 'Ver Vehiculo';
        const br = document.createElement('br');

        card.appendChild(titulo);
        card.appendChild(descripcion);
        card.appendChild(precio);
        card.appendChild(ul);
        card.appendChild(btn);

        listaAnuncios.appendChild(card);
    });

    return listaAnuncios;
}

export default crearAnuncios;