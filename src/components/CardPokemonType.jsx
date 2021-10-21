import React from "react";

var _ = require('lodash');

function CardPokemonType(props) {

    function getTypeClass(type) {
        return("pokemon-type" + " " + type);
    }

    return(
        <div className={getTypeClass(props.typeName)}>
            {_.upperFirst(props.typeName)}
        </div>
    );
}

export default CardPokemonType;