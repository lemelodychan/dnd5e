import React from 'react';

function ModifierCalc({ attributeName, baseValue, character, calculateAttribute }) {
    const { totalValue, modifier } = calculateAttribute(attributeName, baseValue, character);

    return (
        <div>
            <h3>{attributeName} Score:</h3>
            <p>{totalValue}</p>
            <h3>{attributeName} Modifier:</h3>
            <p>{modifier >= 0 ? `+${modifier}` : `${modifier}`}</p>
        </div>
    );
}

export default ModifierCalc;