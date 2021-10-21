import React from "react";
// import CardPokemonType from "./CardPokemonType";
import { Link } from "react-router-dom";

function CardOwnedPokemon(props) {
    const detailUrl = "/my-pokemon-detail/" + props.name + "/" + props.id;

    return(
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
            <div className="flip-card-custom">
                <div className="flip-card-inner-custom">
                    <div className="flip-card-front-custom">
                        <div className="card-pokemon">
                            <div className="card-pokemon-image">
                                <img src={props.image} />
                            </div>
                            <div className="card-pokemon-detail">
                                <div className="pokemon-id">
                                    #{props.id}
                                </div>
                                <div className="pokemon-name">
                                    {props.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flip-card-back-custom">
                        <Link to={detailUrl}>
                            <div className="card-pokemon-back">
                                <div className="ball-image bounce"></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default CardOwnedPokemon;