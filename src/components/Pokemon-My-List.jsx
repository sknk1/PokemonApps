import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CardOwnedPokemon from "./CardOwnedPokemon";

function PokemonMyList() {
    const [pokemonDetail, setPokemonDetail] = useState([]);

    async function getAllPokemon() {
        const url = "https://guarded-chamber-41398.herokuapp.com/myPokemons";
        await axios.get(url)
        .then(resp => {
            const resData = resp.data;
            console.log(resData);
            resData.forEach( async pokemon => {
                const pokemunId = pokemon.idPokemon;
                
                await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemunId)
                .then(async resp => {
                    const newResp = resp.data;
                    newResp.name = pokemon.name;
                    setPokemonDetail(currentList => [...currentList, newResp]);
                    await pokemonDetail.sort((a, b) => a.id - b.id)
                });
            });
        });  
    }
    
    useEffect(() => {
        getAllPokemon();
    }, [])

    return(
        <div className="home-pokemon-page">
            <div className="container">
                <div className="content-wrap">
                    <div className="row">
                        {pokemonDetail.map((pokemon) => 
                            <CardOwnedPokemon 
                                key = {pokemon.id}
                                name = {pokemon.name}
                                id = {pokemon.id}
                                image = {pokemon.sprites.other['official-artwork'].front_default}
                                types = {pokemon.types}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonMyList;