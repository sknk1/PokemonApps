import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import CardPokemonType from "./CardPokemonType";
import CardPokemonProgress from "./CardPokemonProgress";
// import { Redirect } from "react-router-dom";

var _ = require('lodash');

function PokemonOwnedDetail() {
    var { name } = useParams();
    var { id } = useParams();

    const history = useHistory();

    const [pokemonDetail, setPokemonDetail] = useState({});
    const [dataStatus, setDataStatus] = useState(false);

    async function getPokemonByName() {
        const url = "https://pokeapi.co/api/v2/pokemon/" + id;
        await axios.get(url)
        .then(resp => {
            const resData = resp.data;
            setPokemonDetail(resData);
            setDataStatus(true);
        });  
    }
    
    useEffect(() => {
        getPokemonByName();
    }, [])

    async function releasePokemon() {
        const pokemonName = name;
        const pokemonId = id;
        const url = "https://guarded-chamber-41398.herokuapp.com/myPokemons/" + pokemonName;

        await axios.delete(url)
        .then(resp => {
            alert("Pokemon is deleted!");
        })
        .catch(function(error) {
            alert("Error Delete Pokemon!");
            // console.log(error);
        });
        
        history.push("/pokemon-my-list");
    }   

    function RenderElement() {
        return(
            <div className="detail-pokemon-page">
                <div className="background-pokemon">
                    <div className="detail-pokemon-image">
                        <img src={pokemonDetail.sprites.other['official-artwork'].front_default} />
                    </div>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-lg-2">
                                    <h6>Name</h6>
                                    <h4>{_.upperFirst(name)}</h4>
                                </div>
                                <div className="col-lg-2">
                                    <h6>Weight</h6>
                                    <h4>{pokemonDetail.weight}</h4>
                                </div>
                                <div className="col-lg-2">
                                    <h6>Type</h6>
                                    {pokemonDetail.types.map(type => 
                                        <CardPokemonType typeName={type.type.name}/>
                                    )}
                                </div>
                                <div className="col-lg-12">
                                    <div className="progress-section">
                                        <h6>Status</h6>
                                        {pokemonDetail.stats.map(stats => 
                                            <CardPokemonProgress 
                                                baseStat= {stats.base_stat}
                                                baseName= {stats.stat.name}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="hatch-section">
                                        <a className="btn btn-custom-release" 
                                            data-toggle="modal" 
                                            data-target="#releasePokemonModal"
                                            // onClick={setBallClose}
                                            >
                                            Release!
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                <div className="modal fade" id="releasePokemonModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content custom-modal-content">
                            <div>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Are You Sure Want Release Pokemon {name}?</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    <a className="btn btn-custom-release" onClick={releasePokemon} data-dismiss="modal">Yes</a>
                                    <a className="btn btn-custom-cancle" data-dismiss="modal">Cancle</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div>
            {dataStatus ? <RenderElement/> : null}
        </div>
    );
}

export default PokemonOwnedDetail;