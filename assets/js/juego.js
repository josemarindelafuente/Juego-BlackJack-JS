const moduloJuego = (()=>{
    'use strict';

    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    // referencias al HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small');
    const divCartasJugadores = document.querySelectorAll('.divCartas');


    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores ; i++){
            puntosJugadores.push(0);
        } 
        console.log(`Numero de jagadores: ${ numJugadores } y puntos Jugadores es ${puntosJugadores} `);

        puntosHTML.forEach( elem => elem.innerText = 0);
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        divCartasJugadores.forEach( elem => elem.innerHTML= '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        // deck = [];
        // deck = crearDeck();
        // console.log (deck);
    }

    //Genero y barajo el deck de cartas de manera dinámica
    const crearDeck = () => {

        deck = [];
        //genero las cartas numeradas
        for(let i = 2; i <= 10 ; i++) {
            for(let tipo of tipos){
                deck.push( i + tipo);            
            }    
        }
        //genero las cartas especiales
        for (let tipo of tipos ) {
            for (let esp of especiales) {
                deck.push( esp + tipo);
            }
        }
        //barajo el deck de cartas
        deck = _.shuffle(deck)
        return deck;
    }

   

    //tomo una carta del deck y la elimino del mismo
    const pedirCarta = () => {
        if (deck.length === 0){
            throw 'no hay más cartas en la baraja';
        }
        const carta = deck.pop();
        return carta;
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);

        return ( isNaN(valor) ) ? 
        (valor ==='A') ? 11 
        : 10 : valor * 1;

        /*
        let puntos = 0;
        if (isNaN( valor )) {
            console.log ('no es un numero');
            puntos = (valor === 'A') ? 11 : 10;
            console.log(puntos)
        } else {
            console.log ('es un numero')
            puntos = valor * 1; // multiplico por 1 para convertirlo en un entero
            console.log(puntos);
        }
        return valor;
        */
    }

    //Turno: 0 para el primer jugador y el ultimo 0 para la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList = 'carta fade-in-image';
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);  
            crearCarta(carta, puntosJugadores.length-1)
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
        determinarGanador();

    }

    //EVENTOS

    btnPedir.addEventListener('click', () => { //callback

    const carta = pedirCarta();
    const puntosJugardor =  acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugardor > 21) {
        console.warn('Perdiste!!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);
    } else if (puntosJugardor === 21) {
        console.warn('Ganaste con 21 !!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugardor);
    }

    });


    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', ()=>{

        inicializarJuego();

    });



})();


