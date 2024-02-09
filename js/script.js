const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let url = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(url + i)
        .then(response => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(data){
    let tipos = data.types.map(type => 
        `<p class="${type.type.name} tipo">${type.type.name}</p>`
    );
    tipos = tipos.join("")

    let pokeId = data.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    }else if(pokeId.length === 2){
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-imagen">
                        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${data.name}</h2>
                            <div class="pokemon-tipo">
                               ${tipos}
                            </div>
                            <div class="pokemon-stats">
                                <p class="stat">${data.height}m</p>
                                <p class="stat">${data.weight}kg</p>
                            </div>
                        </div>
                    </div>
    
    `
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(url + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))