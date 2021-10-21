import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import CardPokemonType from "./CardPokemonType";
import CardPokemonProgress from "./CardPokemonProgress";
// import { Redirect } from "react-router-dom";
import $ from "jquery";

var _ = require('lodash');

function PokemonDetail() {
    var { id } = useParams();

    const [pokemonDetail, setPokemonDetail] = useState({});
    const [dataStatus, setDataStatus] = useState(false);

    const history = useHistory();

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

    async function savePokemon() {
        const pokemonName = document.getElementById("pokeBallDetailName").value;
        const pokemonId = document.getElementById("pokeBallDetailId").value;
        const url = "https://guarded-chamber-41398.herokuapp.com/myPokemons";
        const params = new URLSearchParams()
        params.append('pokemonName',pokemonName)
        params.append('pokemonId', pokemonId)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        await axios.post(url, params, config)
        .then(resp => {
            alert("Pokemon is added!");
            history.push("/pokemon-my-list");
            $('#exampleModal').hide();
            $(".modal-backdrop.fade.show").removeClass("show modal-backdrop fade");
        })
        .catch(function(error) {
            alert("Pokemon Name is Used!");
            // console.log(error);
            // $('#exampleModal').hide();
            // $(".modal-backdrop.fade.show").removeClass("show modal-backdrop fade");
        });

        // document.getElementsByClassName("modal-backdrop fade").classList.remove("show");
    }   

    function hatchPokemon() {
        // Change Ball Image to Open
        var elementBall = document.getElementById("pokeBall");
        elementBall.classList.remove("ball-image");
        elementBall.classList.add("ball-image-open");
        
        // Random 50% probability
        var random = Math.floor(Math.random()*2) + 1;

        if(random % 2 === 0){
            // Pokemon get caught
            // console.log("TANGKAP");
            var elementBallDetail = document.getElementById("pokeBallDetail");
            elementBallDetail.classList.remove("d-none");
            alert("Congratulations! You got a new pokemon!");
        }else {
            // Pokemon escape
            // console.log("NO");
            alert("Pokemon Escape... Try Again!");
            $('#exampleModal').hide();
            $(".modal-backdrop.fade.show").removeClass("show modal-backdrop fade");
        }
    }

    function setBallClose(){
        // Close pokeball
        var elementBall = document.getElementById("pokeBall");
        elementBall.classList.add("ball-image")
        elementBall.classList.remove("ball-image-open")
        
        // Close form pokeball detail
        var elementBallDetail = document.getElementById("pokeBallDetail");
        elementBallDetail.classList.add ("d-none");
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
                                    <h4>{_.upperFirst(pokemonDetail.name)}</h4>
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
                                        <a className="btn btn-custom" 
                                            data-toggle="modal" 
                                            data-target="#exampleModal"
                                            onClick={setBallClose}>
                                            Catch!
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content custom-modal-content">
                            <div onClick={hatchPokemon} id="pokeBall" className="ball-image"></div>
                            <div className="d-none" id="pokeBallDetail">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add Pokemon Name!</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <input
                                        className="form-control"
                                        name="pokemonName"
                                        placeholder="Pokemon Name"
                                        id="pokeBallDetailName"
                                    />
                                    <input
                                        type="hidden"
                                        id="pokeBallDetailId"
                                        value={pokemonDetail.id}
                                    />

                                </div>
                                <div class="modal-footer">
                                    <a class="btn btn-custom" onClick={savePokemon}>Save Name</a>
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

export default PokemonDetail;