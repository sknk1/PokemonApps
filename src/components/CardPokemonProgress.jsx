import React from "react";
var _ = require('lodash');

function CardPokemonProgress(props) {
    function getProgressBarPercentage (value) {
        return (value +  "%");
    }

    return(
        <div className="progress">
            <div className="progress-bar bg-blue-2" role="progressbar" ariaValuenow={props.baseStat}
            ariaValuemin="0" ariaValuemax="100" style={{width: getProgressBarPercentage(props.baseStat)}}>
                {_.upperFirst(props.baseName)}
            </div>
        </div>
    );
}

export default CardPokemonProgress;