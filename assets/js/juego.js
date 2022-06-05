(()=>{
    'use strict';

    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugardor=0, puntosComputadora= 0;

    // referencias al HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');


    const inicializarJuego = () => {
        deck = crearDeck();
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

    //pedirCarta();

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

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList = 'carta fade-in-image';
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

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

    //EVENTOS

    btnPedir.addEventListener('click', () => { //callback

    const carta = pedirCarta();
    puntosJugardor = puntosJugardor + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugardor;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList = 'carta fade-in-image';
    divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugardor);

    });

    btnNuevo.addEventListener('click', ()=>{
        inicializarJuego();

        puntosJugardor = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        deck = [];
        deck = crearDeck();
        console.log (deck);
    });



})();


