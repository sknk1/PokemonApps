import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CardPokemon from "./CardPokemon";

function PokemonList() {

    const [offset, setOffset] = useState("");
    const [pokemonDetail, setPokemonDetail] = useState([]);

    async function getAllPokemon() {
        const url = "https://guarded-chamber-41398.herokuapp.com/getAllPokemons/0";
        await axios.get(url)
        .then(resp => {
            const resData = resp.data.results;
            // console.log(resData);
            resData.forEach( async pokemon => {
                const pokemunUrl = pokemon.url;
                await axios.get(pokemunUrl)
                .then(async resp => {
                    setPokemonDetail(currentList => [...currentList, resp.data]);
                    await pokemonDetail.sort((a, b) => a.id - b.id)
                });
            });
        });  
        // const data = await response.data;
        // setPokemonData(response.data);

        // data.results.forEach( async pokemon => {
        //     const pokemunUrl = pokemon.url;
        //     const response = await axios.get(pokemunUrl);
        //     setPokemonDetail(currentList => [...currentList, response.data]);
        //     await pokemonDetail.sort((a, b) => a.id - b.id)
        // });
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
                            <CardPokemon 
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

export default PokemonList;