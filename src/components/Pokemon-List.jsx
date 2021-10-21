import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CardPokemon from "./CardPokemon";

function PokemonList() {

    const [offset, setOffset] = useState(0);
    const [pokemonDetail, setPokemonDetail] = useState([]);

    async function getAllPokemon(noOffset) {
        setOffset(noOffset + 20);
        const url = "https://guarded-chamber-41398.herokuapp.com/getAllPokemons/" + offset;
        const allPokemon = await axios.get(url);
        await Promise.all(allPokemon.data.results.map(async (item) => {
            const pokemonDetail2 = await axios.get(item.url);
            pokemonDetail.sort((a, b) => a.id - b.id);
            setPokemonDetail(currentList => [...currentList, pokemonDetail2.data]);
            setPokemonDetail(currentList => currentList.sort((a, b) => a.id - b.id));
            return item + 1;
        }));

        // .then(resp => {
        //     const resData = resp.data.results;

        //     await Promise.all(resData.map(async (item) => {
        //         const pokemonDetail = await axios.get(pokemunUrl);
        //         setPokemonDetail(currentList => [...currentList, pokemonDetail.data]);
        //         return item + 1;
        //     }));

        //     // resData.forEach( async pokemon => {
        //     //     const pokemunUrl = pokemon.url;
        //     //     await axios.get(pokemunUrl)
        //     //     .then(async resp => {
        //     //         setPokemonDetail(currentList => [...currentList, resp.data]);
        //     //         await pokemonDetail.sort((a, b) => a.id - b.id)
        //     //     });
        //     // });
        // });  
        // const data = await response.data;
        // setPokemonData(response.data);

        // data.results.forEach( async pokemon => {
        //     const pokemunUrl = pokemon.url;
        //     const response = await axios.get(pokemunUrl);
        //     setPokemonDetail(currentList => [...currentList, response.data]);
        //     await pokemonDetail.sort((a, b) => a.id - b.id)
        // });
    }

    async function updateNum(){
        await getAllPokemon();
    }
    
    useEffect(() => {
        getAllPokemon(0);
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
                    <div className="d-flex justify-content-center" onClick={updateNum}>
                        <a className="btn btn-custom">
                            LOAD MORE
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonList;